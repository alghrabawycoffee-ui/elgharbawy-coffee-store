"use client";
import Link from 'next/link';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function MobileNav() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        
        <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-[#8A3324]">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center text-gray-500 hover:text-[#8A3324] relative">
          <div className="relative">
            <ShoppingBag className="w-6 h-6 mb-1" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4A373] text-[#5A1F14] text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">السلة</span>
        </Link>

        <Link href="/account" className="flex flex-col items-center text-gray-500 hover:text-[#8A3324]">
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">حسابي</span>
        </Link>

      </div>
    </div>
  );
}