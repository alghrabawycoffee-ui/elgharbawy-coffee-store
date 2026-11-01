"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const openCart = useCartStore((state) => state.openCart);
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="bg-[#3E2723] text-[#FDFBF7] text-center py-2 text-[11px] md:text-xs font-bold tracking-wide">
        احصل على خصم 10% على طلبك الأول
      </div>
      
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-700 w-1/3 justify-start">
          <Link href="/" className="hover:text-[#A44222] transition-colors">الرئيسية</Link>
          <Link href="#products" className="hover:text-[#A44222] transition-colors">المنتجات</Link>
          <Link href="#" className="hover:text-[#A44222] transition-colors">جهات الاتصال</Link>
        </nav>
        <button className="md:hidden text-gray-800 w-1/3 flex justify-start"><Menu className="w-6 h-6" /></button>

        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <img src="/images/logo.jpg" alt="الغرباوي" className="h-16 md:h-20 object-contain transition-transform duration-300 hover:scale-105" />
          </Link>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-4 md:gap-6 text-gray-700">
          <Search className="w-5 h-5 cursor-pointer hover:text-[#A44222] transition-colors hover:scale-110" />
          <Link href="/account"><User className="w-5 h-5 hover:text-[#A44222] transition-colors hover:scale-110" /></Link>
          
          <button onClick={openCart} className="relative group flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 group-hover:text-[#A44222] transition-all group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A44222] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}