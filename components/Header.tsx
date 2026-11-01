"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const openCart = useCartStore((state) => state.openCart);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}#products`);
      setIsSearchOpen(false); // غلق خانة البحث بعد البحث
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="bg-[#3E2723] text-[#FDFBF7] text-center py-2 text-[11px] md:text-xs font-bold tracking-wide">
        احصل على خصم 10% على طلبك الأول
      </div>
      
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center relative">
        
        {/* المنيو (يمين) */}
        <nav className="hidden md:flex gap-8 text-[13px] font-medium text-gray-600 w-1/3 justify-start">
          <Link href="/" className="hover:text-[#A44222] transition-colors">الرئيسية</Link>
          <Link href="#products" className="hover:text-[#A44222] transition-colors">المنتجات</Link>
          <Link href="#" className="hover:text-[#A44222] transition-colors">جهات الاتصال</Link>
        </nav>
        <button className="md:hidden text-gray-800 w-1/3 flex justify-start"><Menu className="w-6 h-6" /></button>

        {/* اللوجو (النص) */}
        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <img src="/images/logo.jpg" alt="الغرباوي" className="h-16 md:h-20 object-contain" />
          </Link>
        </div>

        {/* الأيقونات (شمال) */}
        <div className="w-1/3 flex justify-end items-center gap-4 md:gap-6 text-gray-700">
          {/* زرار البحث */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="w-5 h-5 hover:text-[#A44222] transition-colors" />
          </button>
          <Link href="/account"><User className="w-5 h-5 hover:text-[#A44222] transition-colors" /></Link>
          
          <button onClick={openCart} className="relative group flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 group-hover:text-[#A44222] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A44222] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* شريط البحث اللي بيظهر لما تدوس على الأيقونة */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 p-4 shadow-md animate-fade-in-up">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex items-center">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن منتج..." 
                className="w-full bg-gray-50 border border-gray-300 rounded-full py-3 px-6 outline-none focus:border-[#A44222]"
                autoFocus
              />
              <button type="submit" className="absolute left-2 bg-[#A44222] text-white p-2.5 rounded-full hover:bg-[#852e14]">
                <Search className="w-5 h-5" />
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 text-gray-400 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}