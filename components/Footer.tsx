"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [content, setContent] = useState({
    about: 'وجهتك الأولى للقهوة المختصة في مصر. نختار لك أجود الحبوب ونحمسها بعناية لتستمتع بتجربة قهوة استثنائية.',
    phone: '01000000000',
    email: 'info@elgharbawy.com'
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const fetchContent = async () => {
      const supabase = getSupabase();
      const { data } = await supabase.from('site_content').select('key, value').in('key', ['footer_about', 'footer_phone', 'footer_email']);
      if (data) {
        const newContent = { ...content };
        data.forEach(item => {
          if (item.key === 'footer_about') newContent.about = item.value;
          if (item.key === 'footer_phone') newContent.phone = item.value;
          if (item.key === 'footer_email') newContent.email = item.value;
        });
        setContent(newContent);
      }
    };
    fetchContent();
  }, []);

  return (
    <footer className="bg-[#1A120B] text-white pt-20 pb-10 mt-auto border-t-[6px] border-[#8A3324]">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* اللوجو والوصف */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-3xl font-black text-[#D4A373] mb-6 block tracking-tighter">الغرباوي</Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">{content.about}</p>
          <div className="flex gap-4">
            <a href="#" className="bg-white/5 hover:bg-[#D4A373] hover:text-[#1A120B] p-2.5 rounded-full transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="bg-white/5 hover:bg-[#D4A373] hover:text-[#1A120B] p-2.5 rounded-full transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">المتجر</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-[#D4A373] transition-colors">جميع المنتجات</Link></li>
            <li><Link href="#" className="hover:text-[#D4A373] transition-colors">حبوب القهوة</Link></li>
            <li><Link href="#" className="hover:text-[#D4A373] transition-colors">أدوات التقطير</Link></li>
            <li><Link href="#" className="hover:text-[#D4A373] transition-colors">العروض</Link></li>
          </ul>
        </div>

        {/* حسابي */}
        <div>
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">حسابي</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/login" className="hover:text-[#D4A373] transition-colors">تسجيل الدخول</Link></li>
            <li><Link href="/account" className="hover:text-[#D4A373] transition-colors">طلباتي</Link></li>
            <li><Link href="/cart" className="hover:text-[#D4A373] transition-colors">سلة المشتريات</Link></li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">تواصل معنا</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4A373]" /> 
              <span dir="ltr">{content.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4A373]" /> 
              {content.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs font-medium">
          &copy; {currentYear || 2026} متجر الغرباوي. جميع الحقوق محفوظة.
        </p>
        <div className="flex gap-4 text-xs text-gray-500 font-medium">
          <Link href="#" className="hover:text-white">سياسة الخصوصية</Link>
          <Link href="#" className="hover:text-white">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}