import { Suspense } from 'react';
import { getSupabase } from '@/lib/supabase';
import AddToCartButton from '@/components/AddToCartButton';
import { Star, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function ProductDetails({ id }: { id: string }) {
  const supabase = getSupabase();
  
  // جلب المنتج المحدد من الداتابيز
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود!</h1>
        <Link href="/" className="bg-[#8A3324] text-white px-6 py-2 rounded-lg font-bold">العودة للرئيسية</Link>
      </div>
    );
  }

  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* مسار التنقل */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-bold">
        <Link href="/" className="hover:text-[#8A3324]">الرئيسية</Link>
        <ArrowRight className="w-4 h-4" />
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        {/* صورة المنتج */}
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8 h-[300px] md:h-[500px]">
          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-xl" 
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col justify-center">
          
          <div className="flex items-center gap-1 text-yellow-400 mb-4">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current text-gray-200" />
            <span className="text-gray-500 text-sm mr-2 font-bold">(4.5 تقييم)</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl md:text-4xl font-black text-[#8A3324]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-lg text-gray-400 line-through mb-1 font-bold">{product.old_price} ج.م</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {product.description || "لا يوجد وصف تفصيلي لهذا المنتج حالياً. بن مختص ومحمص بعناية ليمنحك أفضل تجربة قهوة."}
          </p>

          {/* المميزات السريعة */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
              <Truck className="w-6 h-6 text-[#8A3324]" />
              <span className="text-sm font-bold">توصيل سريع</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#8A3324]" />
              <span className="text-sm font-bold">دفع آمن</span>
            </div>
          </div>

          <div className="mt-auto border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-700">المخزون المتاح:</span>
              <span className={`font-black ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} قطعة` : 'نفدت الكمية'}
              </span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // في Next.js 15/16 لازم نفك الـ params الأول
  const resolvedParams = await params;
  
  return (
    <main className="bg-[#FAFAFA] min-h-screen pb-20">
      <Suspense fallback={<div className="text-center py-20 text-xl font-bold">جاري تحميل تفاصيل المنتج...</div>}>
        <ProductDetails id={resolvedParams.id} />
      </Suspense>
    </main>
  );
}