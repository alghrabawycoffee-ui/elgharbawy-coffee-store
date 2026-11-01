"use client";
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // تحديث خانة البحث لو الرابط فيه كلمة بحث حالياً
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}#products`);
    } else {
      router.push('/#products');
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    toast.success('تم تسجيل الخروج');
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-4">
        
        {/* الأيقونات */}
        <div className="flex gap-4 md:gap-6 text-gray-800 items-center">
          <button className="md:hidden"><Menu className="w-6 h-6" /></button>
          
          <Link href="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#8A3324] transition-colors" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8A3324] text-white text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 md:gap-4 border-r border-gray-200 pr-3 md:pr-4">
               {isAdmin && (
                <Link href="/admin" className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#8A3324] bg-[#8A3324]/10 px-3 py-1.5 rounded-full">
                  <LayoutDashboard className="w-4 h-4" /> الإدارة
                </Link>
              )}
              <Link href="/account" className="flex items-center gap-1.5 text-sm font-bold hover:text-[#8A3324]">
                <User className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:inline">حسابي</span>
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 text-sm font-bold hover:text-[#8A3324] border-r border-gray-200 pr-3 md:pr-4">
              <User className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden md:inline">دخول</span>
            </Link>
          )}
        </div>

        {/* اللوجو */}
        <Link href="/" className="text-2xl md:text-3xl font-black text-[#8A3324] tracking-tighter shrink-0">
          الغرباوي
        </Link>

        {/* البحث (شغال) */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden md:block">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن قهوة، أدوات..." 
            className="w-full bg-gray-100/50 border border-transparent rounded-full py-2.5 px-10 focus:outline-none focus:bg-white focus:border-[#8A3324] transition-all text-sm font-medium" 
          />
          <button type="submit" className="absolute right-4 top-3 text-gray-400 hover:text-[#8A3324]">
            <Search className="w-4 h-4" />
          </button>
        </form>
        
        {/* بحث الموبايل (أيقونة بس) */}
        <div className="md:hidden">
           <Search className="w-6 h-6 text-gray-800" />
        </div>

      </div>
    </header>
  );
}