"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. الكود ده هو اللي بيحل المشكلة: بيشوف لو المستخدم مسجل، يحوله فوراً
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/account'); 
      }
    };
    checkUser();
  }, [router]);

  // 2. دالة الدخول العادي
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error('بيانات الدخول غير صحيحة');
    } else {
      toast.success('تم تسجيل الدخول بنجاح!');
      router.push('/account');
      router.refresh();
    }
    setLoading(false);
  };

  // 3. دالة الدخول بجوجل (متأكد إن redirectTo بياخد رابط الموقع الحالي)
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });
    if (error) toast.error(error.message);
  };

  // 4. دالة الدخول بفيسبوك
  const handleFacebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex w-full max-w-4xl border border-gray-100">
        
        {/* الجزء الأيسر: صورة */}
        <div className="hidden md:block w-1/2 relative bg-[#1A120B]">
          <img 
            src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Coffee" 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-black text-white mb-2">أهلاً بك في الغرباوي ☕</h2>
            <p className="text-gray-300">سجل دخولك عشان تستمتع بأجود أنواع البن وتتابع طلباتك بسهولة.</p>
          </div>
        </div>

        {/* الجزء الأيمن: الفورم */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-black text-[#8A3324] mb-2 block">الغرباوي</Link>
            <h1 className="text-2xl font-bold text-gray-800">تسجيل الدخول</h1>
            <p className="text-gray-500 text-sm mt-1">مرحباً بعودتك! من فضلك أدخل بياناتك.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:border-[#8A3324] focus:ring-1 focus:ring-[#8A3324] transition-all bg-gray-50" placeholder="example@email.com" />
                <Mail className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:border-[#8A3324] focus:ring-1 focus:ring-[#8A3324] transition-all bg-gray-50" placeholder="••••••••" />
                <Lock className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-[#8A3324] text-white font-bold py-3.5 rounded-xl hover:bg-[#5A1F14] transition-all shadow-md hover:shadow-lg flex justify-center items-center">
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-bold">أو</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors font-bold text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067C3.193 21.302 7.27 24 12 24c3.055 0 5.782-1.145 7.91-3l-3.87-2.987z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg>
              Google
            </button>
            <button onClick={handleFacebookLogin} type="button" className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors font-bold text-gray-700">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-gray-600">
            ليس لديك حساب؟ <Link href="/register" className="text-[#8A3324] font-bold hover:underline">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
    </div>
  );
}