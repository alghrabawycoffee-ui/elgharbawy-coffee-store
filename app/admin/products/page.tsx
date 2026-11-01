"use client";
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Trash2, Edit } from 'lucide-react'; // ضفنا Edit
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const supabase = getSupabase();
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من مسح المنتج؟')) return;
    const supabase = getSupabase();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) toast.error('خطأ في المسح');
    else { toast.success('تم المسح'); fetchProducts(); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-[#5A1F14]">المنتجات</h1>
        <Link href="/admin/products/add" className="bg-[#8A3324] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5A1F14]">
          <Plus className="w-5 h-5" /> إضافة منتج
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4">المنتج</th>
              <th className="p-4">السعر</th>
              <th className="p-4">المخزون</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold">{product.name}</td>
                <td className="p-4 font-bold text-[#8A3324]">
                  {product.price} ج.م
                  {product.old_price && <span className="block text-xs text-gray-400 line-through">{product.old_price} ج.م</span>}
                </td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex gap-2">
                  {/* زرار التعديل */}
                  <Link href={`/admin/products/edit/${product.id}`} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">لا توجد منتجات.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}