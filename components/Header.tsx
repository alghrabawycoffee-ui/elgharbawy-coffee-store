"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [user, setUser] = useState<any>(null);
  const [topBarText, setTopBarText] = useState('🚚 شحن مجاني للطلبات فوق 500 ج.م | توصيل لجميع محافظات مصر');
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();

    // جلب حالة المستخدم
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // جلب نص الشريط العلوي
    const fetchTopBar = async () => {
      const { data } = await supabase.from('site_content').select('value').eq('key', 'top_bar').single();
      if (data) setTopBarText(data.value);
    };
    fetchTopBar();

    // متابعة تغيرات تسجيل الدخول
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    toast.success('تم تسجيل الخروج');
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* الشريط العلوي الديناميكي */}
      <div className="bg-[#5A1F14] text-[#D4A373] text-center py-2 text-[10px] md:text-sm font-bold">
        {topBarText}
      </div>
      
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <div className="flex gap-4 md:gap-6 text-gray-700 items-center">
          
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 cursor-pointer group-hover:text-[#8A3324] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4A373] text-[#5A1F14] text-[10px] md:text-xs font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 md:gap-4 border-r pr-3 md:pr-4">
              <Link href="/account" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-bold hover:text-[#8A3324]">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">حسابي</span>
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700" title="تسجيل الخروج">
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-bold hover:text-[#8A3324] border-r pr-3 md:pr-4">
              <User className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">تسجيل الدخول</span>
            </Link>
          )}
        </div>

        <Link href="/" className="text-2xl md:text-3xl font-black text-[#8A3324]">الغرباوي</Link>

        <div className="relative w-1/3 hidden md:block">
          <input type="text" placeholder="ابحث..." className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-10 focus:outline-none focus:border-[#8A3324]" />
          <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>
    </header>
  );
}