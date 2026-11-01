"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShoppingBag, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // دالة سحب الطلبات من الداتابيز
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false }); // الأحدث الأول

    if (!error && data) setOrders(data);
    setLoading(false);
  };

  // التحقق من صلاحية الأدمن أول ما الصفحة تفتح
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login'); // لو مش مسجل يروح للدخول
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        setIsAdmin(true);
        fetchOrders(); // لو أدمن، هات الطلبات
      } else {
        router.push('/'); // لو عميل عادي، اطرده للرئيسية
      }
    };
    
    checkAdmin();
  }, [router]);

  // دالة تغيير حالة الطلب
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('حدث خطأ أثناء التحديث');
    } else {
      toast.success('تم تحديث حالة الطلب بنجاح');
      fetchOrders(); // تحديث الجدول
    }
  };

  // حساب الإحصائيات
  const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((sum, order) => sum + Number(order.total_price), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  // دالة مساعدة لعرض لون الحالة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">قيد الانتظار</span>;
      case 'shipped': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">تم الشحن</span>;
      case 'completed': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">مكتمل</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">جاري تحميل لوحة التحكم...</div>;
  if (!isAdmin) return <div className="text-center py-20 text-xl font-bold text-red-500">غير مصرح لك بالدخول!</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-[#5A1F14] mb-8">لوحة تحكم الغرباوي</h1>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border-l-4 border-[#8A3324]">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">إجمالي المبيعات</p>
            <p className="text-2xl font-black text-gray-800">{totalSales} ج.م</p>
          </div>
          <div className="bg-red-50 p-3 rounded-full"><DollarSign className="w-6 h-6 text-[#8A3324]" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">طلبات قيد الانتظار</p>
            <p className="text-2xl font-black text-gray-800">{pendingOrders}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-full"><Clock className="w-6 h-6 text-yellow-600" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border-l-4 border-green-500">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">طلبات مكتملة</p>
            <p className="text-2xl font-black text-gray-800">{completedOrders}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-full"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-gray-500 text-sm font-bold mb-1">إجمالي الطلبات</p>
            <p className="text-2xl font-black text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full"><ShoppingBag className="w-6 h-6 text-blue-600" /></div>
        </div>
      </div>

      {/* جدول الطلبات */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">أحدث الطلبات</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-bold">رقم الطلب</th>
                <th className="p-4 font-bold">اسم العميل</th>
                <th className="p-4 font-bold">الموبايل</th>
                <th className="p-4 font-bold">الإجمالي</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold">تغيير الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                  <td className="p-4 font-bold">{order.customer_name}</td>
                  <td className="p-4 text-gray-600" dir="ltr">{order.phone}</td>
                  <td className="p-4 font-black text-[#8A3324]">{order.total_price} ج.م</td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                  <td className="p-4">
                    <select 
                      className="border rounded-lg p-2 text-sm focus:outline-none focus:border-[#8A3324] bg-white cursor-pointer"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">لا توجد طلبات حتى الآن.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}