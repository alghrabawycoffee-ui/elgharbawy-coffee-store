import { Suspense } from 'react';
import { getSupabase } from '@/lib/supabase';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function ProductDetails({ id }: { id: string }) {
  const supabase = getSupabase();
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h1>
        <Link href="/" className="bg-[#8B3A1A] text-white px-6 py-2 rounded-lg font-bold">العودة للرئيسية</Link>
      </div>
    );
  }

  const fallbackImage = "/images/bag.jpg";

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
      {/* مسار التنقل */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
        <Link href="/" className="hover:text-[#8B3A1A]">الرئيسية</Link>
        <ArrowRight className="w-4 h-4" />
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        
        {/* صورة المنتج */}
        <div className="bg-gray-50 rounded-2xl p-10 flex items-center justify-center aspect-square">
          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col justify-center py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-[#8B3A1A]">LE {product.price}.00</span>
            {product.old_price && (
              <span className="text-lg text-gray-400 line-through">LE {product.old_price}.00</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description || "قهوة مختصة محمصة بعناية لتمنحك أفضل تجربة قهوة. اخترنا لك أجود الحبوب لتناسب ذوقك."}
          </p>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">حالة التوفر:</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'متوفر في المخزون' : 'غير متوفر'}
              </span>
            </div>
          </div>

          <AddToCartButton product={product} />
          
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500">
            <p>✓ شحن سريع لجميع المحافظات</p>
            <p>✓ إمكانية الدفع عند الاستلام</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <main className="bg-white min-h-screen">
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">جاري تحميل المنتج...</div>}>
        <ProductDetails id={resolvedParams.id} />
      </Suspense>
    </main>
  );
}