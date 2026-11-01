"use client";

import { useCartStore } from '../../store/cartStore';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  // سحب الدوال والبيانات من Zustand
  const { items, removeFromCart, updateQuantity } = useCartStore();
  
  // حساب المجاميع
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 50 : 0; // شحن ثابت 50 ج.م حالياً
  const total = subtotal + shipping;

  // لو السلة فاضية
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md w-full">
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">سلة المشتريات فارغة</h2>
          <p className="text-gray-500 mb-8">يبدو أنك لم تضف أي منتجات إلى سلتك بعد.</p>
          <Link href="/" className="bg-[#8A3324] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#5A1F14] transition-colors inline-block">
            ابدأ التسوق الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8 text-center">سلة المشتريات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* قائمة المنتجات */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 py-6 last:border-0 last:pb-0">
              
              {/* صورة المنتج */}
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
              </div>
              
              {/* تفاصيل المنتج */}
              <div className="flex-1 text-center sm:text-right">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                <p className="text-[#8A3324] font-black text-xl">{item.price} ج.م</p>
              </div>
              
              {/* التحكم في الكمية */}
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="font-bold w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded shadow-sm transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              {/* زرار الحذف */}
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                title="حذف المنتج"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h2>
          
          <div className="flex justify-between mb-3 text-gray-600">
            <span>المجموع الفرعي</span>
            <span className="font-bold">{subtotal} ج.م</span>
          </div>
          
          <div className="flex justify-between mb-6 text-gray-600">
            <span>الشحن</span>
            <span className="font-bold">{shipping} ج.م</span>
          </div>
          
          <div className="flex justify-between font-black text-2xl text-[#5A1F14] border-t border-gray-100 pt-4 mb-8">
            <span>الإجمالي</span>
            <span>{total} ج.م</span>
          </div>
          
          <Link 
            href="/checkout" 
            className="w-full bg-[#8A3324] text-white hover:bg-[#5A1F14] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            إتمام الطلب <ArrowLeft className="w-5 h-5" />
          </Link>

          <Link href="/" className="block text-center mt-4 text-gray-500 hover:text-[#8A3324] text-sm font-bold">
            مواصلة التسوق
          </Link>
        </div>

      </div>
    </div>
  );
}