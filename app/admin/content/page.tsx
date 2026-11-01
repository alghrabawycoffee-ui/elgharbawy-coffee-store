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

  const fetchContent = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('site_content').select('*').order('id');
    if (!error && data) setContents(data);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const handleChange = (id: number, newValue: string) => {
    setContents(contents.map(c => c.id === id ? { ...c, value: newValue } : c));
  };

  const handleSave = async (id: number, key: string, value: string) => {
    setSavingId(id);
    const supabase = getSupabase();
    const { error } = await supabase.from('site_content').update({ value }).eq('id', id);
    if (error) toast.error('حدث خطأ أثناء الحفظ');
    else toast.success(`تم حفظ التعديل!`);
    setSavingId(null);
  };

  if (loading) return <div className="text-center py-20 text-xl font-bold">جاري التحميل...</div>;

  // بنجمع النصوص حسب القسم عشان الترتيب يبقى شيك
  const sections = ["marquee", "features", "brand_story", "testimonials"];

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-[#8A3324] mb-6 font-bold">
        <ArrowRight className="w-5 h-5" /> العودة للوحة التحكم
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm mb-10">
        <h1 className="text-2xl font-black text-[#5A1F14] mb-2 flex items-center gap-2">
          <Type className="w-6 h-6" /> التحكم في نصوص وأقسام الموقع
        </h1>
        <p className="text-gray-500 mb-8">من هنا تقدر تعدل أي كلمة، وتفتح أو تقفل أي قسم في الصفحة الرئيسية.</p>

        {sections.map(sectionName => {
          const sectionContent = contents.filter(c => c.section === sectionName);
          if (sectionContent.length === 0) return null;

          return (
            <div key={sectionName} className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="font-black text-gray-700 capitalize">{sectionName.replace('_', ' ')}</h2>
              </div>
              <div className="p-4 space-y-4">
                {sectionContent.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-3 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <label className="font-bold text-sm text-gray-600 w-full md:w-1/4">{item.key}</label>
                    
                    {/* لو القيمة true/false بنعمل Checkbox */}
                    {item.value === 'true' || item.value === 'false' ? (
                      <div className="flex-1 flex items-center gap-3">
                         <input 
                          type="checkbox" 
                          checked={item.value === 'true'}
                          onChange={(e) => handleChange(item.id, e.target.checked ? 'true' : 'false')}
                          className="w-5 h-5 accent-[#8A3324]"
                        />
                        <span className="text-sm font-bold">{item.value === 'true' ? 'مفعل (ظاهر)' : 'مخفي (مقفول)'}</span>
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={item.value || ''} 
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        className="flex-1 w-full border p-2 rounded-lg bg-gray-50 focus:border-[#8A3324] outline-none text-sm" 
                      />
                    )}
                    
                    <button 
                      onClick={() => handleSave(item.id, item.key, item.value)}
                      disabled={savingId === item.id}
                      className="bg-[#8A3324] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#5A1F14] transition-colors flex items-center gap-1 disabled:opacity-50 text-sm w-full md:w-auto"
                    >
                      <Save className="w-4 h-4" /> {savingId === item.id ? 'جاري...' : 'حفظ'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}