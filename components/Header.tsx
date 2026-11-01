"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [topBarText, setTopBarText] = useState('🚚 شحن مجاني للطلبات فوق 500 ج.م');
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (profile?.role === 'admin') setIsAdmin(true);
      }
    };
    getUser();
    
    const fetchTopBar = async () => {
      const { data } = await supabase.from('site_content').select('value').eq('key', 'top_bar').single();
      if (data) setTopBarText(data.value);
    };
    fetchTopBar();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (!session?.user) setIsAdmin(false);
      else {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        if (profile?.role === 'admin') setIsAdmin(true);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    toast.success('تم تسجيل الخروج');
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      {/* الشريط العلوي */}
      <div className="bg-[#1A120B] text-[#D4A373] text-center py-2 text-[11px] md:text-xs font-bold tracking-wider">
        {topBarText}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* الأيقونات والسلة */}
        <div className="flex gap-5 text-gray-800 items-center">
          <button className="md:hidden"><Menu className="w-6 h-6" /></button>
          
          {/* أيقونة السلة - هنا */}
          <Link href="/cart" className="relative group hidden md:block">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 cursor-pointer group-hover:text-[#8A3324] transition-colors" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8A3324] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-1.5 text-xs font-bold text-[#8A3324] hover:text-[#5A1F14] transition-colors bg-[#8A3324]/10 px-3 py-1.5 rounded-full">
                  <LayoutDashboard className="w-4 h-4" /> لوحة التحكم
                </Link>
              )}
              <Link href="/account" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-[#8A3324] transition-colors">
                <User className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:inline">حسابي</span>
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors" title="تسجيل الخروج">
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-[#8A3324] transition-colors border-r border-gray-200 pr-4">
              <User className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden md:inline">دخول</span>
            </Link>
          )}
        </div>

        {/* اللوجو */}
        <Link href="/" className="text-2xl md:text-4xl font-black text-[#8A3324] tracking-tighter">
          الغرباوي
        </Link>

        {/* البحث */}
        <div className="relative w-1/3 hidden md:block max-w-sm">
          <input type="text" placeholder="ابحث عن قهوة، أدوات..." className="w-full bg-gray-100/50 border-none rounded-full py-2.5 px-10 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all text-sm font-medium" />
          <Search className="w-4 h-4 absolute right-4 top-3 text-gray-400" />
        </div>
        
        {/* سلة الموبايل */}
        <Link href="/cart" className="relative group md:hidden">
          <ShoppingBag className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#8A3324] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}