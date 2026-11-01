"use client";

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false }); // الأحدث الأول

    if (!error && data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = getSupabase();
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

  // دالة مساعدة لعرض لون الحالة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/> قيد الانتظار</span>;
      case 'shipped': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Truck className="w-3 h-3"/> تم الشحن</span>;
      case 'completed': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/> مكتمل</span>;
      case 'cancelled': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle className="w-3 h-3"/> ملغي</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">جاري تحميل الطلبات...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-[#5A1F14]">إدارة الطلبات</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-bold">رقم الطلب</th>
                <th className="p-4 font-bold">اسم العميل</th>
                <th className="p-4 font-bold">الموبايل</th>
                <th className="p-4 font-bold">الإجمالي</th>
                <th className="p-4 font-bold">الحالة الحالية</th>
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