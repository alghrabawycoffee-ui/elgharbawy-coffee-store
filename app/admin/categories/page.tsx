"use client";
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', image_url: '' });

  const fetchCategories = async () => {
    const supabase = getSupabase();
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    setCategories(data || []);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    const { error } = await supabase.from('categories').insert([formData]);
    if (error) toast.error('خطأ في الإضافة');
    else { toast.success('تمت إضافة القسم'); setFormData({ name: '', image_url: '' }); fetchCategories(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('حذف القسم؟')) return;
    const supabase = getSupabase();
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black text-[#5A1F14] mb-8">إدارة الأقسام</h1>
      
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">اسم القسم</label>
          <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" placeholder="مثال: حبوب قهوة" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">رابط الصورة (URL)</label>
          <input required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" placeholder="https://..." />
        </div>
        <button type="submit" className="bg-[#8A3324] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5A1F14] h-[48px]">
          <Plus className="w-5 h-5" /> إضافة
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4">
              <img src={cat.image_url} className="w-12 h-12 rounded-full object-cover border" />
              <span className="font-bold">{cat.name}</span>
            </div>
            <button onClick={() => handleDelete(cat.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}