"use client";
import { useCartStore } from '../store/cartStore';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity } = useCartStore();
  
  // حالة إعدادات الشحن المجاني
  const [shippingConfig, setShippingConfig] = useState({
    show: true,
    threshold: 500,
    text: 'أضف بقيمة {amount} ج.م للحصول على شحن مجاني',
    success: 'مبروك! لقد حصلت على شحن مجاني 🎉'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      const supabase = getSupabase();
      const { data } = await supabase.from('site_content').select('key, value').in('key', ['show_free_shipping', 'free_shipping_threshold', 'free_shipping_text', 'free_shipping_success_text']);
      
      if (data) {
        const config: any = {};
        data.forEach(item => { config[item.key] = item.value; });
        setShippingConfig({
          show: config.show_free_shipping === 'true',
          threshold: Number(config.free_shipping_threshold) || 500,
          text: config.free_shipping_text || 'أضف بقيمة {amount} ج.م للحصول على شحن مجاني',
          success: config.free_shipping_success_text || 'مبروك! لقد حصلت على شحن مجاني 🎉'
        });
      }
    };
    fetchConfig();
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= shippingConfig.threshold ? 0 : 50; 
  const total = subtotal + shipping;
  
  // حساب النسبة المئوية للشريط
  const progress = Math.min((subtotal / shippingConfig.threshold) * 100, 100);
  const amountLeft = shippingConfig.threshold - subtotal;
  
  // تجهيز النص ديناميكياً
  const displayText = subtotal >= shippingConfig.threshold 
    ? shippingConfig.success 
    : shippingConfig.text.replace('{amount}', amountLeft.toString());

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart}></div>

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            سلة التسوق <span className="text-sm bg-[#A44222] text-white px-2 py-0.5 rounded-full">{items.length}</span>
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* شريط الشحن المجاني الديناميكي */}
          {shippingConfig.show && (
            <div className="bg-[#FDFBF7] p-4 rounded-xl border border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-600 mb-2">
                {displayText}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#A44222] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 mx-auto text-gray-200 mb-4" />
              <p className="text-lg font-bold text-gray-500">سلتك فارغة حالياً</p>
              <button onClick={closeCart} className="mt-4 text-[#A44222] font-bold hover:underline">تصفح المنتجات</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                <img src={item.image_url} alt={item.name} className="w-20 h-24 object-contain bg-gray-50 rounded-lg p-2" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-[#A44222] font-black text-sm mt-1">{item.price} ج.م</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-gray-50 text-gray-600"><Plus className="w-3.5 h-3.5" /></button>
                      <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-gray-50 text-gray-600"><Minus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-white">
            <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
              <span>المجموع الفرعي</span>
              <span>{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-600 mb-4">
              <span>الشحن</span>
              <span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-gray-900 border-t border-gray-100 pt-4 mb-4">
              <span>الإجمالي</span>
              <span>{total} ج.م</span>
            </div>
            
            <Link href="/checkout" onClick={closeCart} className="w-full bg-[#A44222] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#852e14] transition-colors shadow-lg">
              إتمام الطلب <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/cart" onClick={closeCart} className="block text-center mt-3 text-sm text-gray-500 font-bold hover:text-[#A44222]">
              عرض السلة بالتفصيل
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}