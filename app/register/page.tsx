"use client";
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase'; // التعديل هنا: استخدمنا getSupabase
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const supabase = getSupabase(); // التعديل هنا: استدعاء الدالة جوة الدالة

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // حفظ الاسم في بيانات المستخدم
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
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex w-full max-w-4xl border border-gray-100 flex-row-reverse">
        
        {/* الجزء الأيسر: صورة */}
        <div className="hidden md:block w-1/2 relative bg-[#1A120B]">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Coffee" 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-black text-white mb-2">انضم لعائلة الغرباوي ☕</h2>
            <p className="text-gray-300">أنشئ حسابك الآن لتستمتع بتجربة تسوق أسهل وتتابع طلباتك خطوة بخطوة.</p>
          </div>
        </div>

        {/* الجزء الأيمن: الفورم */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black text-[#8A3324] mb-2 block">الغرباوي</Link>
            <h1 className="text-2xl font-bold text-gray-800">إنشاء حساب جديد</h1>
            <p className="text-gray-500 text-sm mt-1">أدخل بياناتك للانضمام إلينا.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الاسم بالكامل</label>
              <div className="relative">
                <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:border-[#8A3324] bg-gray-50" placeholder="أحمد محمد" />
                <User className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:border-[#8A3324] bg-gray-50" placeholder="example@email.com" />
                <Mail className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:border-[#8A3324] bg-gray-50" placeholder="••••••••" />
                <Lock className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-[#8A3324] text-white font-bold py-3.5 rounded-xl hover:bg-[#5A1F14] transition-all mt-4 disabled:opacity-70">
              {loading ? 'جاري التسجيل...' : 'تسجيل'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600">
            لديك حساب بالفعل؟ <Link href="/login" className="text-[#8A3324] font-bold hover:underline">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}