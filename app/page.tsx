import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import { Star } from 'lucide-react'
import AddToCartButton from '../components/AddToCartButton'
import Hero from '../components/Hero' // استدعاء البنر
import Features from '../components/Features' // استدعاء المميزات

async function ProductsList() {
  const supabase = getSupabase(); 
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) return <div className="text-center text-red-500 p-10">حدث خطأ في جلب البيانات: {error.message}</div>
  if (!products || products.length === 0) return <p className="text-center text-gray-500 py-10">لا توجد منتجات في الداتابيز حالياً.</p>

  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-10 py-6 md:py-10 container mx-auto">
      {products.map((product: any) => (
        <div key={product.id} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
          
          <div className="relative h-40 md:h-64 bg-gray-50 flex items-center justify-center p-2 md:p-4 w-full overflow-hidden">
            <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#8A3324] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full z-10">
              جديد
            </span>
            <img 
              src={product.image_url || fallbackImage} 
              alt={product.name}
              className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 z-0"
            />
          </div>

          <div className="p-3 md:p-5 text-center flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-center gap-0.5 md:gap-1 text-yellow-400 mb-1 md:mb-3">
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-current text-gray-200" />
              </div>
              
              <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-1 md:mb-3 line-clamp-2 h-10 md:h-auto">{product.name}</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-2 mb-2 md:mb-5 mt-2">
                <span className="text-base md:text-xl font-black text-[#8A3324]">{product.price} ج.م</span>
                {product.old_price && (
                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.old_price} ج.م</span>
                )}
              </div>
            </div>

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
      {/* البنر الرئيسي */}
      <Hero />
      
      {/* المميزات */}
      <Features />

      {/* عنوان المنتجات */}
      <div id="products" className="text-center mt-8 md:mt-12 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 inline-block relative">
          الأكثر <span className="text-[#8A3324]">مبيعاً</span>
          <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 bg-[#D4A373] rounded-full"></span>
        </h2>
      </div>

      {/* شبكة المنتجات */}
      <Suspense fallback={<div className="text-center py-20 text-gray-500 text-lg">جاري تحميل المنتجات...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  )
}