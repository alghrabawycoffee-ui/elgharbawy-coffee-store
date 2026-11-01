"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
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
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="text-xl font-bold text-[#D4A373] mb-4">الغرباوي</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{content.about}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-[#D4A373] transition-colors">من نحن</Link></li>
            <li><Link href="#" className="hover:text-[#D4A373] transition-colors">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">حسابي</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/login" className="hover:text-[#D4A373] transition-colors">تسجيل الدخول</Link></li>
            <li><Link href="/account" className="hover:text-[#D4A373] transition-colors">تتبع الطلب</Link></li>
            <li><Link href="/cart" className="hover:text-[#D4A373] transition-colors">سلة المشتريات</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
          <ul className="space-y-3 text-gray-400 text-sm mb-6">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {content.phone}</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {content.email}</li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-gray-800 pt-6 text-gray-500 text-sm">
        &copy; {currentYear || 2026} متجر الغرباوي. صنع في مصر ❤️
      </div>
    </footer>
  );
}