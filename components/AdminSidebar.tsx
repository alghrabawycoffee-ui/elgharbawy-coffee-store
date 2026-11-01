"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Box, ShoppingCart, Type, Image as ImageIcon, FolderTree, Store } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: 'الرئيسية', path: '/admin', icon: LayoutDashboard },
    { name: 'المنتجات', path: '/admin/products', icon: Box },
    { name: 'الأقسام', path: '/admin/categories', icon: FolderTree },
    { name: 'البنرات (العروض)', path: '/admin/banners', icon: ImageIcon },
    { name: 'الطلبات', path: '/admin/orders', icon: ShoppingCart },
    { name: 'نصوص الموقع', path: '/admin/content', icon: Type },
  ];

  return (
    <aside className="w-64 bg-white border-l border-gray-200 text-gray-600 flex flex-col hidden md:flex h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-black text-[#A44222]">الغرباوي</h1>
        <p className="text-xs text-gray-400 mt-1 font-medium">لوحة التحكم الشاملة</p>
      </div>
      
      <nav className="flex-1 py-6 space-y-1 px-4 overflow-y-auto">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                isActive ? 'bg-[#F9F8F6] text-[#A44222]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-[#A44222]' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-[#A44222] rounded-xl transition-all">
          <Store className="w-5 h-5" /> العودة للمتجر
        </Link>
      </div>
    </aside>
  );
}