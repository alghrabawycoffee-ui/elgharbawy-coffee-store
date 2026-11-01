"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState({
    about: 'وجهتك الأولى للقهوة المختصة في مصر. نختار لك أجود الحبوب ونحمسها بعناية.',
    phone: '01000000000',
    email: 'info@elgharbawy.com',
    copyright: '© 2026 متجر الغرباوي. جميع الحقوق محفوظة.'
  });

  useEffect(() => {
    const fetchContent = async () => {
      const supabase = getSupabase();
      const { data } = await supabase.from('site_content').select('key, value').in('key', ['footer_about', 'footer_phone', 'footer_email', 'footer_copyright']);
      if (data) {
        const newContent = { ...content };
        data.forEach(item => {
          if (item.key === 'footer_about') newContent.about = item.value;
          if (item.key === 'footer_phone') newContent.phone = item.value;
          if (item.key === 'footer_email') newContent.email = item.value;
          if (item.key === 'footer_copyright') newContent.copyright = item.value;
        });
        setContent(newContent);
      }
    };
    fetchContent();
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-16">
      
      {/* قسم النشرة البريدية (شيك ونضيف) */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-16">
        <div className="bg-[#F9F8F6] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">انضم إلى قائمتنا البريدية</h3>
            <p className="text-gray-500 text-sm font-light">انضم للحصول على أحدث التخفيضات والعروض الحصرية.</p>
          </div>
          <form className="flex w-full md:w-auto bg-white rounded-md overflow-hidden border border-gray-200 focus-within:border-[#A44222] transition-colors" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="عنوان البريد الإلكتروني" 
              className="bg-transparent text-gray-800 px-4 py-3 outline-none w-full md:w-64 placeholder:text-gray-400 text-sm font-light" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-[#A44222] text-white px-6 py-3 font-medium text-sm hover:bg-[#852e14] transition-colors">
              سجل
            </button>
          </form>
        </div>
      </div>

      {/* الروابط الأساسية (بدون خلفية غامقة) */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-center md:text-right">
        <div>
          <img src="/images/logo.jpg" alt="الغرباوي" className="h-16 mx-auto md:mx-0 mb-6" />
          <p className="text-gray-500 text-sm font-light leading-relaxed">{content.about}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">روابط سريعة</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-light">
            <li><Link href="/" className="hover:text-[#A44222] transition-colors">الرئيسية</Link></li>
            <li><Link href="#products" className="hover:text-[#A44222] transition-colors">المنتجات</Link></li>
            <li><Link href="#" className="hover:text-[#A44222] transition-colors">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">حسابي</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-light">
            <li><Link href="/login" className="hover:text-[#A44222] transition-colors">تسجيل الدخول</Link></li>
            <li><Link href="/account" className="hover:text-[#A44222] transition-colors">تتبع الطلب</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-light">
            <li className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4" /> {content.phone}</li>
            <li className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4" /> {content.email}</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-light">
        <p>{content.copyright}</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#A44222]">سياسة الخصوصية</Link>
          <Link href="#" className="hover:text-[#A44222]">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}