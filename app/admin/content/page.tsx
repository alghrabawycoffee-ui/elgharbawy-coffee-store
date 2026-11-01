"use client";

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Save, ArrowRight, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminContentPage() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('site_content').select('*').order('id');
    if (!error && data) setContents(data);
    setLoading(false);
  };

  const handleChange = (id: number, newValue: string) => {
    setContents(contents.map(c => c.id === id ? { ...c, value: newValue } : c));
  };

  const handleSave = async (id: number, key: string, value: string) => {
    setSavingId(id);
    const supabase = getSupabase();
    const { error } = await supabase.from('site_content').update({ value }).eq('id', id);

    if (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    } else {
      toast.success(`تم حفظ النص بنجاح!`);
    }
    setSavingId(null);
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">جاري التحميل...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-[#8A3324] mb-6 font-bold">
        <ArrowRight className="w-5 h-5" /> العودة للوحة التحكم
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-black text-[#5A1F14] mb-8 flex items-center gap-2">
          <Type className="w-6 h-6" /> التحكم في نصوص الموقع
        </h1>

        <div className="space-y-6">
          {contents.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-gray-700">{item.key}</label>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{item.section}</span>
              </div>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={item.value || ''} 
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-full border p-3 rounded-lg bg-gray-50 focus:border-[#8A3324] outline-none" 
                />
                <button 
                  onClick={() => handleSave(item.id, item.key, item.value)}
                  disabled={savingId === item.id}
                  className="bg-[#8A3324] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5A1F14] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {savingId === item.id ? 'جاري الحفظ' : 'حفظ'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}