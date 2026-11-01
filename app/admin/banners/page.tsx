"use client";

import { Suspense, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Plus, Trash2, FolderTree, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

// 1. المكون الداخلي الذي يحتوي على كل المنطق (Client Component)
function CategoriesContent() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', image_url: '' });

  const fetchCategories = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image_url.startsWith('http')) {
      toast.error('خطأ: رابط الصورة يجب أن يبدأ بـ http:// أو https://');
      return;
    }

    setIsSubmitting(true);
    const supabase = getSupabase();
    
    const { error } = await supabase.from('categories').insert([
      { 
        name: formData.name, 
        image_url: formData.image_url 
      }
    ]);

    if (error) {
      toast.error('حدث خطأ أثناء الإضافة');
    } else {
      toast.success('تمت إضافة القسم بنجاح!');
      setFormData({ name: '', image_url: '' });
      fetchCategories();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من مسح هذا القسم؟')) return;
    
    const supabase = getSupabase();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    
    if (error) {
      toast.error('حدث خطأ أثناء المسح');
    } else {
      toast.success('تم مسح القسم');
      fetchCategories();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#8A3324]/10 p-3 rounded-xl">
          <FolderTree className="w-8 h-8 text-[#8A3324]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#5A1F14]">إدارة الأقسام</h1>
          <p className="text-gray-500 text-sm font-bold mt-1">أضف أقسام جديدة لتظهر في الصفحة الرئيسية</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-end border border-gray-100">
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold mb-2 text-gray-700">اسم القسم</label>
          <input 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:border-[#8A3324] transition-colors" 
            placeholder="مثال: حبوب قهوة، ماكينات..." 
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold mb-2 text-gray-700">رابط الصورة (URL كامل)</label>
          <input 
            required 
            value={formData.image_url} 
            onChange={e => setFormData({...formData, image_url: e.target.value})} 
            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:border-[#8A3324] transition-colors" 
            placeholder="https://images.unsplash.com/..." 
            dir="ltr"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#8A3324] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5A1F14] transition-colors h-[50px] w-full md:w-auto disabled:opacity-70"
        >
          <Plus className="w-5 h-5" /> {isSubmitting ? 'جاري الإضافة...' : 'إضافة قسم'}
        </button>
      </form>

      {loading ? (
        <div className="text-center py-10 font-bold text-gray-500">جاري تحميل الأقسام...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700">لا توجد أقسام حالياً</h3>
          <p className="text-gray-500 mt-2">استخدم الفورم بالأعلى لإضافة أول قسم.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between border border-gray-100 group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 p-0.5">
                  <img 
                    src={cat.image_url} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <span className="font-bold text-gray-800 text-lg">{cat.name}</span>
              </div>
              <button 
                onClick={() => handleDelete(cat.id)} 
                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
                title="مسح القسم"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. المكون الرئيسي الذي يغلف المحتوى بـ Suspense
export default function AdminCategoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">جاري تحميل الصفحة...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}