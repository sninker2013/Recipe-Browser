import "./globals.css"
import { Nav } from "@/components/nav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <h1>My Recipe App</h1>
        <Nav/>
        {children}
        </body>
    </html>
  );
}
