"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.');
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-black text-center mb-6 text-[#5A1F14]">إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-bold mb-1">الاسم بالكامل</label>
            <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#8A3324]" />
          </div>
          <div>
            <label className="block font-bold mb-1">البريد الإلكتروني</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#8A3324]" />
          </div>
          <div>
            <label className="block font-bold mb-1">كلمة المرور</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#8A3324]" />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#8A3324] text-white font-bold py-3 rounded-lg hover:bg-[#5A1F14] transition-colors">
            {loading ? 'جاري التسجيل...' : 'تسجيل'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          لديك حساب بالفعل؟ <Link href="/login" className="text-[#8A3324] font-bold">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}