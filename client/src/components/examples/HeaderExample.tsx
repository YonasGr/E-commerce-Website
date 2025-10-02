import Header from "../Header";
import { ThemeProvider } from "../ThemeProvider";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header cartItemCount={3} />
    </ThemeProvider>
  );
}
