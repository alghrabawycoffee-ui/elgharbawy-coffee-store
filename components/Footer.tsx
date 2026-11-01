"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState({
    about: 'وجهتك الأولى للقهوة المختصة في مصر.',
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
    <footer className="bg-[#3E2723] text-white pt-16 pb-8">
      
      {/* قسم النشرة البريدية (زي بن مصر) */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-12 border-b border-white/10 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-2">انضم إلى قائمتنا البريدية</h3>
            <p className="text-gray-400 text-sm">انضم للحصول على أحدث التخفيضات والعروض الحصرية.</p>
          </div>
          <form className="flex w-full md:w-auto bg-white/10 rounded-md overflow-hidden border border-white/20" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="عنوان البريد الإلكتروني" 
              className="bg-transparent text-white px-4 py-3 outline-none w-full md:w-64 placeholder:text-gray-400 text-sm" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-[#A44222] text-white px-6 py-3 font-bold text-sm hover:bg-[#852e14] transition-colors">
              سجل
            </button>
          </form>
        </div>
      </div>

      {/* الروابط الأساسية */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center md:text-right">
        <div>
          <img src="/images/logo.jpg" alt="الغرباوي" className="h-16 mx-auto md:mx-0 mb-4 bg-white p-1 rounded-md" />
          <p className="text-gray-400 text-sm leading-relaxed">{content.about}</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white">الرئيسية</Link></li>
            <li><Link href="#products" className="hover:text-white">المنتجات</Link></li>
            <li><Link href="#" className="hover:text-white">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">حسابي</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/login" className="hover:text-white">تسجيل الدخول</Link></li>
            <li><Link href="/account" className="hover:text-white">تتبع الطلب</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4" /> {content.phone}</li>
            <li className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4" /> {content.email}</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>{content.copyright}</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white">سياسة الخصوصية</Link>
          <Link href="#" className="hover:text-white">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}