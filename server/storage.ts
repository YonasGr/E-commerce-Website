import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Category,
  type InsertCategory,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  getCartItems(sessionId: string): Promise<Array<CartItem & { product: Product }>>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, sessionId: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string, sessionId: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;

  getAllCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private categories: Map<string, Category>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.categories = new Map();

    this.seedInitialData();
  }

  private seedInitialData() {
    const mockProducts: Array<InsertProduct & { id: string }> = [
      {
        id: "1",
        name: "Classic Chronograph Watch",
        description: "Elegant timepiece with premium leather strap and chronograph functionality",
        price: "299.00",
        category: "Watches",
        image: "/assets/stock_images/premium_watch_closeu_4714ba80.jpg",
        rating: "4.8",
        isNew: true,
        stock: 15,
      },
      {
        id: "2",
        name: "Minimalist Leather Watch",
        description: "Clean design with genuine leather band, perfect for everyday wear",
        price: "249.00",
        category: "Watches",
        image: "/assets/stock_images/premium_watch_closeu_04060ace.jpg",
        rating: "4.9",
        isNew: false,
        stock: 20,
      },
      {
        id: "3",
        name: "Sport Chronograph",
        description: "Durable sports watch with water resistance and precision timing",
        price: "349.00",
        category: "Watches",
        image: "/assets/stock_images/premium_watch_closeu_fc0cb07d.jpg",
        rating: "4.7",
        isNew: true,
        stock: 12,
      },
      {
        id: "4",
        name: "Elegant Dress Watch",
        description: "Sophisticated timepiece perfect for formal occasions",
        price: "399.00",
        category: "Watches",
        image: "/assets/stock_images/premium_watch_closeu_ef285bc2.jpg",
        rating: "4.9",
        isNew: false,
        stock: 8,
      },
      {
        id: "5",
        name: "Aviator Sunglasses",
        description: "Classic aviator style with UV protection and polarized lenses",
        price: "149.00",
        category: "Sunglasses",
        image: "/assets/stock_images/modern_sunglasses_pr_e1ce36cc.jpg",
        rating: "4.6",
        isNew: false,
        stock: 25,
      },
      {
        id: "6",
        name: "Classic Wayfarers",
        description: "Timeless wayfarer design with premium acetate frames",
        price: "129.00",
        category: "Sunglasses",
        image: "/assets/stock_images/modern_sunglasses_pr_7da6e494.jpg",
        rating: "4.7",
        isNew: false,
        stock: 30,
      },
      {
        id: "7",
        name: "Modern Round Frames",
        description: "Contemporary round sunglasses with gradient lenses",
        price: "159.00",
        category: "Sunglasses",
        image: "/assets/stock_images/modern_sunglasses_pr_44b7d134.jpg",
        rating: "4.5",
        isNew: true,
        stock: 18,
      },
      {
        id: "8",
        name: "Leather Wallet",
        description: "Premium leather bi-fold wallet with RFID protection",
        price: "89.00",
        category: "Accessories",
        image: "/assets/stock_images/minimalist_accessori_6ac54b01.jpg",
        rating: "4.8",
        isNew: false,
        stock: 40,
      },
      {
        id: "9",
        name: "Leather Card Holder",
        description: "Slim card holder crafted from premium leather",
        price: "59.00",
        category: "Accessories",
        image: "/assets/stock_images/minimalist_accessori_bb498747.jpg",
        rating: "4.7",
        isNew: false,
        stock: 35,
      },
      {
        id: "10",
        name: "Designer Belt",
        description: "Elegant leather belt with polished metal buckle",
        price: "79.00",
        category: "Accessories",
        image: "/assets/stock_images/minimalist_accessori_52360f41.jpg",
        rating: "4.6",
        isNew: true,
        stock: 22,
      },
      {
        id: "11",
        name: "Leather Keychain",
        description: "Handcrafted leather keychain with brass hardware",
        price: "29.00",
        category: "Accessories",
        image: "/assets/stock_images/minimalist_accessori_75db2cec.jpg",
        rating: "4.5",
        isNew: false,
        stock: 50,
      },
    ];

    mockProducts.forEach((product) => {
      const { id, ...productData } = product;
      this.products.set(id, {
        ...productData,
        description: productData.description ?? null,
        rating: productData.rating ?? null,
        isNew: productData.isNew ?? null,
        stock: productData.stock ?? null,
        id,
        createdAt: new Date(),
      });
    });

    const mockCategories: Array<InsertCategory & { id: string }> = [
      {
        id: "cat-1",
        name: "Watches",
        image: "/assets/stock_images/premium_watch_closeu_4714ba80.jpg",
        productCount: 4,
      },
      {
        id: "cat-2",
        name: "Sunglasses",
        image: "/assets/stock_images/modern_sunglasses_pr_e1ce36cc.jpg",
        productCount: 3,
      },
      {
        id: "cat-3",
        name: "Accessories",
        image: "/assets/stock_images/minimalist_accessori_bb498747.jpg",
        productCount: 4,
      },
    ];

    mockCategories.forEach((category) => {
      const { id, ...categoryData } = category;
      this.categories.set(id, {
        ...categoryData,
        productCount: categoryData.productCount ?? null,
        id,
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      description: insertProduct.description ?? null,
      rating: insertProduct.rating ?? null,
      isNew: insertProduct.isNew ?? null,
      stock: insertProduct.stock ?? null,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<Array<CartItem & { product: Product }>> {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );

    return items
      .map((item) => {
        const product = this.products.get(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is CartItem & { product: Product } => item !== null);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (item) =>
        item.sessionId === insertItem.sessionId &&
        item.productId === insertItem.productId
    );

    if (existing) {
      existing.quantity += insertItem.quantity ?? 1;
      this.cartItems.set(existing.id, existing);
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      ...insertItem,
      quantity: insertItem.quantity ?? 1,
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(
    id: string,
    sessionId: string,
    quantity: number
  ): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item || item.sessionId !== sessionId) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: string, sessionId: string): Promise<boolean> {
    const item = this.cartItems.get(id);
    if (!item || item.sessionId !== sessionId) return false;
    
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );

    itemsToRemove.forEach((item) => this.cartItems.delete(item.id));
    return true;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      ...insertCategory,
      productCount: insertCategory.productCount ?? null,
      id,
    };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
