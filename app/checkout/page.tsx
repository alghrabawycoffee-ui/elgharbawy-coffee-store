"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import { supabase } from '../../lib/supabase';
import { Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  
  // بيانات الفورم
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // حسابات السلة
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      // 1. جلب بيانات المستخدم الحالي (لو مسجل دخول)
      const { data: { user } } = await supabase.auth.getUser();

      // 2. حفظ الطلب الأساسي في جدول orders
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.name,
          phone: formData.phone,
          address: formData.address,
          total_price: total,
          status: 'pending',
          user_id: user?.id || null // ربط الطلب بالعميل
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. حفظ تفاصيل المنتجات في جدول order_items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 4. تفريغ السلة وإظهار رسالة النجاح
      clearCart();
      setIsSuccess(true);
      toast.success('تم استلام طلبك بنجاح!');
      
      // العودة للرئيسية بعد 4 ثواني
      setTimeout(() => {
        router.push('/');
      }, 4000);

    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error("حدث خطأ أثناء إتمام الطلب: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // لو السلة فاضية
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">سلة المشتريات فارغة</h2>
        <Link href="/" className="bg-[#8A3324] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5A1F14]">العودة للتسوق</Link>
      </div>
    );
  }

  // شاشة النجاح
  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-gray-800 mb-2">تم استلام طلبك بنجاح!</h2>
        <p className="text-gray-600 mb-6">شكراً لتسوقك معنا. سيتم التواصل معك قريباً لتأكيد الطلب.</p>
        <Link href="/" className="bg-[#8A3324] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#5A1F14]">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-center mb-10 text-[#5A1F14]">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* فورم البيانات */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">بيانات التوصيل</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-bold mb-2 text-gray-700">الاسم بالكامل</label>
              <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-lg focus:outline-none focus:border-[#8A3324] bg-gray-50" placeholder="أحمد محمد" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-700">رقم الموبايل</label>
              <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full border p-3 rounded-lg focus:outline-none focus:border-[#8A3324] bg-gray-50" placeholder="01xxxxxxxxx" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-700">العنوان بالتفصيل</label>
              <textarea required name="address" value={formData.address} onChange={handleChange} className="w-full border p-3 rounded-lg focus:outline-none focus:border-[#8A3324] bg-gray-50" rows={3} placeholder="المحافظة، المدينة، الشارع، رقم العمارة..."></textarea>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-4 border-b pb-4">طريقة الدفع</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-[#8A3324] bg-[#fff8f0] rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="cash" checked readOnly className="accent-[#8A3324]" />
                <span className="font-bold text-[#5A1F14]">الدفع عند الاستلام (كاش)</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-8 bg-[#8A3324] text-white font-bold py-4 rounded-xl hover:bg-[#5A1F14] transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? 'جاري تأكيد الطلب...' : `تأكيد الطلب (${total} ج.م)`}
              {!isSubmitting && <Lock className="w-5 h-5" />}
            </button>
          </form>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h2>
          
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-50 rounded-lg p-1 border">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold whitespace-nowrap">{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي</span>
              <span className="font-bold">{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>الشحن</span>
              <span className="font-bold">{shipping} ج.م</span>
            </div>
            <div className="flex justify-between font-black text-2xl text-[#5A1F14] border-t pt-4 mt-4">
              <span>الإجمالي</span>
              <span>{total} ج.م</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}