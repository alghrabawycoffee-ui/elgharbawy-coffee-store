"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Box, ShoppingCart, Type, ArrowRight, Store } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: 'الرئيسية', path: '/admin', icon: LayoutDashboard },
    { name: 'المنتجات', path: '/admin/products', icon: Box },
    { name: 'الطلبات', path: '/admin/orders', icon: ShoppingCart },
    { name: 'نصوص الموقع', path: '/admin/content', icon: Type },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-[#1A120B] text-white flex flex-col hidden md:flex shadow-xl z-20">
        <div className="p-6 text-center border-b border-gray-800">
          <h1 className="text-2xl font-black text-[#D4A373]">الغرباوي</h1>
          <p className="text-xs text-gray-400 mt-1">لوحة التحكم</p>
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-4">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive ? 'bg-[#8A3324] text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#D4A373] hover:bg-gray-800 rounded-xl transition-all">
            <Store className="w-5 h-5" /> العودة للمتجر
          </Link>
        </div>
      </aside>

      {/* محتوى الصفحات */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}