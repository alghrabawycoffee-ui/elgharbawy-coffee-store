"use client";
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User, Package, Clock, LogOut } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = getSupabase(); // 1. استدعاء الدالة هنا
      
      // جلب بيانات المستخدم
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);

      // جلب طلبات العميل
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders(data || []);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    const supabase = getSupabase(); // 2. استدعاء الدالة هنا كمان
    await supabase.auth.signOut();
    toast.success('تم تسجيل الخروج');
    router.push('/');
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">جاري التحميل...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#D4A373] p-4 rounded-full text-[#5A1F14]">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#5A1F14] mb-1">مرحباً بك 👋</h1>
            <p className="text-gray-600 font-bold">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" /> تسجيل الخروج
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Package className="w-5 h-5" /> سجل طلباتي</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center text-gray-500 flex flex-col items-center">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-lg font-bold mb-4">لا توجد طلبات سابقة.</p>
          <Link href="/" className="bg-[#8A3324] text-white px-6 py-2 rounded-lg font-bold">ابدأ التسوق الآن</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="font-bold text-gray-800">طلب رقم: #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="font-black text-[#8A3324] text-xl">{order.total_price} ج.م</div>
              <div>
                {order.status === 'pending' && <span className="text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4"/> قيد الانتظار</span>}
                {order.status === 'shipped' && <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-bold">تم الشحن</span>}
                {order.status === 'completed' && <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold">مكتمل</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}