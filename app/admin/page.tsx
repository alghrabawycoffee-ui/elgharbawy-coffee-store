"use client";

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase'; 
import { DollarSign, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ sales: 0, pending: 0, completed: 0, total: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = getSupabase();
      const { data: orders } = await supabase.from('orders').select('total_price, status');
      
      if (orders) {
        const total = orders.length;
        const sales = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.total_price), 0);
        const pending = orders.filter(o => o.status === 'pending').length;
        const completed = orders.filter(o => o.status === 'completed').length;
        setStats({ sales, pending, completed, total });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-[#5A1F14] mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#A44222] flex items-center justify-between">
          <div><p className="text-gray-500 font-medium mb-1">المبيعات</p><p className="text-3xl font-bold text-gray-800">{stats.sales} <span className="text-sm font-normal">ج.م</span></p></div>
          <div className="bg-red-50 p-4 rounded-full"><DollarSign className="w-8 h-8 text-[#A44222]" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500 flex items-center justify-between">
          <div><p className="text-gray-500 font-medium mb-1">قيد الانتظار</p><p className="text-3xl font-bold text-gray-800">{stats.pending}</p></div>
          <div className="bg-yellow-50 p-4 rounded-full"><Clock className="w-8 h-8 text-yellow-600" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
          <div><p className="text-gray-500 font-medium mb-1">مكتملة</p><p className="text-3xl font-bold text-gray-800">{stats.completed}</p></div>
          <div className="bg-green-50 p-4 rounded-full"><CheckCircle2 className="w-8 h-8 text-green-600" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
          <div><p className="text-gray-500 font-medium mb-1">إجمالي الطلبات</p><p className="text-3xl font-bold text-gray-800">{stats.total}</p></div>
          <div className="bg-blue-50 p-4 rounded-full"><ShoppingBag className="w-8 h-8 text-blue-600" /></div>
        </div>
      </div>
    </div>
  );
}