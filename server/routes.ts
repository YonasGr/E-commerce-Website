import type { Express, Response } from "express";
import type { Request } from "express-serve-static-core";
import type { Session } from "express-session";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { randomUUID } from "crypto";

interface SessionRequest extends Request {
  session: Session & {
    cartId?: string;
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (req: SessionRequest, res: Response) => {
    try {
      const { category, search } = req.query;

      let products;
      if (search && typeof search === "string") {
        products = await storage.searchProducts(search);
      } else if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req: SessionRequest, res: Response) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (req: SessionRequest, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/cart", async (req: SessionRequest, res: Response) => {
    try {
      if (!req.session) {
        return res.status(500).json({ error: "Session not available" });
      }

      if (!req.session.cartId) {
        req.session.cartId = randomUUID();
      }

      const items = await storage.getCartItems(req.session.cartId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: SessionRequest, res: Response) => {
    try {
      if (!req.session) {
        return res.status(500).json({ error: "Session not available" });
      }

      if (!req.session.cartId) {
        req.session.cartId = randomUUID();
      }

      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId: req.session.cartId,
      });

      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid cart item data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req: SessionRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!req.session?.cartId) {
        return res.status(401).json({ error: "No cart session found" });
      }

      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      const updatedItem = await storage.updateCartItemQuantity(id, req.session.cartId, quantity);

      if (!updatedItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req: SessionRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (!req.session?.cartId) {
        return res.status(401).json({ error: "No cart session found" });
      }

      const success = await storage.removeFromCart(id, req.session.cartId);

      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req: SessionRequest, res: Response) => {
    try {
      if (!req.session?.cartId) {
        return res.json({ success: true });
      }

      await storage.clearCart(req.session.cartId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
