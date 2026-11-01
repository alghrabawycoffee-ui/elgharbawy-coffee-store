"use client";
import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', old_price: '', stock: '' });
  const [productId, setProductId] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
      
      const supabase = getSupabase();
      const { data } = await supabase.from('products').select('*').eq('id', resolvedParams.id).single();
      
      if (data) {
        setFormData({
          name: data.name,
          description: data.description || '',
          price: data.price.toString(),
          old_price: data.old_price ? data.old_price.toString() : '',
          stock: data.stock.toString(),
        });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = getSupabase();
    
    const { error } = await supabase.from('products').update({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      old_price: formData.old_price ? parseFloat(formData.old_price) : null,
      stock: parseInt(formData.stock),
    }).eq('id', productId);

    if (error) toast.error('خطأ في الحفظ');
    else { toast.success('تم التعديل بنجاح!'); router.push('/admin/products'); }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center font-bold">جاري التحميل...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-[#8A3324] mb-6 font-bold">
        <ArrowRight className="w-5 h-5" /> العودة للمنتجات
      </Link>
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-black text-[#5A1F14] mb-6">تعديل المنتج</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block font-bold mb-2">اسم المنتج</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" /></div>
          <div><label className="block font-bold mb-2">الوصف</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" rows={3}></textarea></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block font-bold mb-2">السعر الحالي</label><input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" /></div>
            <div><label className="block font-bold mb-2">السعر قبل الخصم (للعروض)</label><input type="number" value={formData.old_price} onChange={e => setFormData({...formData, old_price: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" placeholder="اتركه فارغاً لو مفيش خصم" /></div>
          </div>
          <div><label className="block font-bold mb-2">المخزون</label><input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border p-3 rounded-lg bg-gray-50" /></div>
          <button disabled={saving} type="submit" className="w-full bg-[#8A3324] text-white font-bold py-4 rounded-xl hover:bg-[#5A1F14] mt-6 flex justify-center gap-2">
            <Save className="w-5 h-5" /> {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
          </button>
        </form>
      </div>
    </div>
  );
}