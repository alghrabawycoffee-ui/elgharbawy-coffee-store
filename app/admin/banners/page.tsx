"use client";

import { Suspense, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

// 1. المكون الداخلي الذي يحتوي على كل المنطق
function BannersContent() {
  const [banners, setBanners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ tag: '', title: '', subtitle: '', description: '', image_url: '', show_timer: false });

  const fetchBanners = async () => {
    const supabase = getSupabase();
    const { data } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
    setBanners(data || []);
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url.startsWith('http')) {
      toast.error('رابط الصورة يجب أن يبدأ بـ http:// أو https://');
      return;
    }
    const supabase = getSupabase();
    const { error } = await supabase.from('banners').insert([formData]);
    if (error) toast.error('خطأ في الإضافة');
    else {
      toast.success('تمت إضافة البنر بنجاح!');
      setShowForm(false);
      setFormData({ tag: '', title: '', subtitle: '', description: '', image_url: '', show_timer: false });
      fetchBanners();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من مسح هذا البنر؟')) return;
    const supabase = getSupabase();
    await supabase.from('banners').delete().eq('id', id);
    toast.success('تم المسح');
    fetchBanners();
  };

  return (
    <div className="p-8">
      {/* ... نفس محتوى الصفحة السابق ... */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-[#5A1F14]">إدارة بنرات العروض</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#8A3324] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5A1F14]">
          <Plus className="w-5 h-5" /> {showForm ? 'إلغاء' : 'إضافة بنر جديد'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm mb-8 space-y-4">
          {/* ... حقول الفورم ... */}
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold mb-1">التاج (مثال: عرض محدود)</label><input required value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full border p-2 rounded-lg" /></div>
            <div><label className="block text-sm font-bold mb-1">العنوان الرئيسي</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded-lg" /></div>
            <div><label className="block text-sm font-bold mb-1">العنوان الفرعي</label><input required value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full border p-2 rounded-lg" /></div>
            <div><label className="block text-sm font-bold mb-1">رابط الصورة (URL كامل)</label><input required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full border p-2 rounded-lg" placeholder="https://..." /></div>
          </div>
          <div><label className="block text-sm font-bold mb-1">الوصف</label><textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded-lg" rows={2}></textarea></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={formData.show_timer} onChange={e => setFormData({...formData, show_timer: e.target.checked})} className="w-5 h-5" /><label className="font-bold">إظهار العداد التنازلي</label></div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">حفظ البنر</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex border relative">
            <img src={banner.image_url} className="w-1/3 object-cover" alt={banner.title} />
            <div className="p-4 w-2/3">
              <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{banner.tag}</span>
              <h3 className="font-black text-lg mt-2">{banner.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{banner.description}</p>
              <button onClick={() => handleDelete(banner.id)} className="absolute bottom-4 left-4 text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. المكون الرئيسي الذي يغلف المحتوى بـ Suspense
export default function AdminBannersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">جاري تحميل الصفحة...</div>}>
      <BannersContent />
    </Suspense>
  );
}