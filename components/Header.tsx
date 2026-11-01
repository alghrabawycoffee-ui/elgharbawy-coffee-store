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
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center gap-4">
        
        {/* الأيقونات */}
        <div className="flex gap-4 md:gap-6 text-[#1A120B] items-center">
          <button className="md:hidden"><Menu className="w-6 h-6" /></button>
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#A44222] transition-colors" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A44222] text-white text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="flex items-center gap-1.5 text-sm font-bold hover:text-[#A44222]">
            <User className="w-5 h-5" strokeWidth={1.5} />
            <span className="hidden md:inline">دخول</span>
          </Link>
        </div>

        {/* اللوجو - المسار الصح */}
        <Link href="/" className="shrink-0 flex justify-center">
          <img 
            src="/images/logo.jpg" 
            alt="الغرباوي" 
            className="h-16 md:h-20 object-contain drop-shadow-sm" 
          />
        </Link>

        {/* البحث */}
        <form onSubmit={handleSearch} className="relative w-full max-w-xs hidden md:block">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث..." 
            className="w-full bg-gray-100/50 border border-transparent rounded-full py-2 px-9 focus:outline-none focus:bg-white focus:border-[#A44222] transition-all text-sm" 
          />
          <Search className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
        </form>
        <div className="md:hidden"><Search className="w-6 h-6" /></div>
      </div>
    </header>
  );
}