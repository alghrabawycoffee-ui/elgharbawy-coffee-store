"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-gray-200/50">
      
      {/* شريط الإعلانات الرفيع */}
      <div className="bg-[#1A120B] text-[#D4A373] text-center py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase">
        شحن مجاني للطلبات فوق 500 ج.م
      </div>
      
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* القائمة */}
        <div className="flex gap-6 items-center">
          <button className="md:hidden text-gray-800"><Menu className="w-6 h-6" /></button>
          <Link href="/" className="hidden md:block text-sm font-bold text-gray-500 hover:text-[#1A120B] transition-colors">المتجر</Link>
          <Link href="#" className="hidden md:block text-sm font-bold text-gray-500 hover:text-[#1A120B] transition-colors">قصتنا</Link>
        </div>

        {/* اللوجو */}
        <Link href="/" className="text-2xl md:text-3xl font-black text-[#1A120B] tracking-tighter">
          الغرباوي
        </Link>

        {/* الأيقونات */}
        <div className="flex gap-5 items-center text-[#1A120B]">
          <Search className="w-5 h-5 cursor-pointer hover:text-[#8A3324] transition-colors hidden md:block" strokeWidth={1.5} />
          <Link href="/account">
            <User className="w-5 h-5 cursor-pointer hover:text-[#8A3324] transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-[#8A3324] transition-colors" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8A3324] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}