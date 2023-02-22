import { Banner } from "../../components/Banner";
import { Header } from "../../components/Header";
import "../../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="text-white px-5 sm:px-10 bg-[#0e1217] mb-36">
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
