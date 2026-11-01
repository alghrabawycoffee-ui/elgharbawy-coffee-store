"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) router.push(`/?q=${encodeURIComponent(searchTerm.trim())}#products`);
    else router.push('/#products');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* الشريط العلوي البني */}
      <div className="bg-[#3E2723] text-[#FDFBF7] text-center py-2 text-xs md:text-sm font-bold">
        قهوة محمصة طازجة توصل إلى باب منزلك
      </div>
      
      {/* الهيدر الرئيسي */}
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-4">
        
        {/* الأيقونات (شمال) */}
        <div className="flex gap-4 text-gray-700 items-center w-1/3 justify-start">
          <button className="md:hidden"><Menu className="w-6 h-6" /></button>
          <Link href="/login" className="hidden md:flex items-center gap-1 hover:text-[#D35400]">
            <User className="w-5 h-5" />
          </Link>
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#D35400]" onClick={() => document.getElementById('search-input')?.focus()} />
            <input 
              id="search-input"
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="absolute -right-10 top-0 w-0 opacity-0 focus:w-48 focus:opacity-100 focus:right-8 transition-all duration-300 border-b border-gray-300 outline-none text-sm bg-transparent"
            />
          </form>
          <Link href="/cart" className="relative group flex items-center gap-1">
            <ShoppingBag className="w-5 h-5 hover:text-[#D35400] transition-colors" />
            <span className="text-sm font-bold hidden md:inline">السلة</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D35400] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* اللوجو (النص) */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="flex justify-center">
            <img 
              src="/images/logo.jpg" 
              alt="الغرباوي" 
              className="h-16 md:h-20 object-contain" 
            />
          </Link>
        </div>

        {/* المنيو (يمين) */}
        <div className="w-1/3 flex justify-end">
          <nav className="hidden md:flex gap-6 text-sm font-bold text-gray-700">
            <Link href="/" className="hover:text-[#D35400] transition-colors">الرئيسية</Link>
            <Link href="#products" className="hover:text-[#D35400] transition-colors">المنتجات</Link>
            <Link href="#" className="hover:text-[#D35400] transition-colors">جهات الاتصال</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}