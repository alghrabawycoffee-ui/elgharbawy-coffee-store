import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import { Star } from 'lucide-react'
import AddToCartButton from '../components/AddToCartButton'
import HeroSlider from '../components/HeroSlider'
import Features from '../components/Features'
import Link from 'next/link' // ضفنا اللينك عشان المنتجات تفتح صفحة التفاصيل

async function ProductsList() {
  const supabase = getSupabase(); 
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) return <div className="text-center text-red-500 p-10">حدث خطأ في جلب البيانات</div>
  if (!products || products.length === 0) return <p className="text-center text-gray-500 py-10">لا توجد منتجات في الداتابيز حالياً.</p>

  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-10 py-6 md:py-10 container mx-auto">
      {products.map((product: any) => (
        <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.1)] transition-all duration-300 group flex flex-col border border-gray-50">
          
          {/* الصورة (لينك) */}
          <Link href={`/product/${product.id}`} className="relative h-44 md:h-64 bg-gray-50 flex items-center justify-center p-4 w-full overflow-hidden block">
            <span className="absolute top-3 right-3 bg-[#8A3324] text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md">
              جديد
            </span>
            <img 
              src={product.image_url || fallbackImage} 
              alt={product.name}
              className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 z-0 mix-blend-multiply"
            />
          </Link>

          {/* التفاصيل */}
          <div className="p-4 md:p-5 text-center flex flex-col flex-grow justify-between">
            <div>
              {/* النجوم */}
              <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              
              {/* الاسم (لينك) */}
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[40px] md:min-h-[50px] hover:text-[#8A3324] transition-colors">{product.name}</h3>
              </Link>
              
              {/* السعر */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mb-4">
                <span className="text-lg md:text-xl font-black text-[#8A3324]">{product.price} ج.م</span>
                {product.old_price && (
                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.old_price} ج.م</span>
                )}
              </div>
            </div>

            {/* زرار إضافة للسلة */}
            <div className="mt-auto">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <main className="pb-20 bg-[#FAFAFA]">
      
      {/* 1. البنر الرئيسي */}
      <HeroSlider />
      
      {/* 2. شريط المميزات */}
      <Features />

      {/* 3. عنوان المنتجات */}
      <div id="products" className="text-center mt-4 md:mt-8 mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 inline-block relative">
          الأكثر <span className="text-[#8A3324]">مبيعاً</span>
          <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-[#D4A373] rounded-full"></span>
        </h2>
      </div>

      {/* 4. شبكة المنتجات */}
      <Suspense fallback={<div className="text-center py-20 text-gray-500 text-lg">جاري تحميل المنتجات...</div>}>
        <ProductsList />
      </Suspense>
      
    </main>
  )
}