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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">نظرة عامة</h1>
        <p className="text-sm text-gray-500 mt-1 font-light">ملخص أداء المتجر اليوم.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">إجمالي المبيعات</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.sales} <span className="text-sm font-light">ج.م</span></p>
          </div>
          <div className="bg-[#FDFBF7] p-3 rounded-xl"><DollarSign className="w-6 h-6 text-[#A44222]" /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">قيد الانتظار</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-xl"><Clock className="w-6 h-6 text-yellow-600" /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">مكتملة</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-xl"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">إجمالي الطلبات</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl"><ShoppingBag className="w-6 h-6 text-blue-600" /></div>
        </div>
      </div>
    </div>
  );
}