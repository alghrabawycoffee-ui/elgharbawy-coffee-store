import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

// استيراد CSS الخاص بالسلايدر هنا عشان نمنع مشكلة التكرار
import 'swiper/css';
import 'swiper/css/pagination';

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "الغرباوي | متجر البن المختص",
  description: "وجهتك الأولى للقهوة المختصة في مصر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased bg-[#FDFBF7] flex flex-col min-h-screen`}>
        <Toaster position="bottom-center" toastOptions={{
          style: { fontFamily: 'var(--font-cairo)', direction: 'rtl' },
          success: { iconTheme: { primary: '#8A3324', secondary: '#fff' } }
        }} />
        <Header /> 
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}