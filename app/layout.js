import "./globals.css";
import Nav from "@/app/(components)/Layouts/Nav";
import Footer from "@/app/(components)/Layouts/Footer";

export const metadata = {
  title: "game-analysis",
  description: "IUST Fall 2023",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Nav />
      {children}
      <Footer year={new Date().getFullYear()}/>
      </body>
    </html>
  );
}
