import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import { Star } from 'lucide-react'
import AddToCartButton from '../components/AddToCartButton'
import HeroSlider from '../components/HeroSlider'
import Features from '../components/Features'
import Link from 'next/link' 

async function ProductsList() {
  const supabase = getSupabase(); 
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) return <div className="text-center text-red-500 p-10">حدث خطأ في جلب البيانات</div>
  if (!products || products.length === 0) return <p className="text-center text-gray-500 py-10">لا توجد منتجات.</p>

  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-10 py-6 md:py-10 container mx-auto">
      {products.map((product: any) => (
        <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group flex flex-col relative">
          
          <Link href={`/product/${product.id}`} className="relative h-48 md:h-72 bg-[#FDFBF7] flex items-center justify-center p-6 w-full overflow-hidden block rounded-t-[2rem]">
            <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-800 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
              جديد
            </span>
            <img 
              src={product.image_url || fallbackImage} 
              alt={product.name}
              className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out z-0 mix-blend-multiply"
            />
          </Link>

          <div className="p-4 md:p-6 text-center flex flex-col flex-grow justify-between bg-white rounded-b-[2rem]">
            <div>
              <div className="flex justify-center gap-0.5 text-yellow-400 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px] md:min-h-[50px] group-hover:text-[#8A3324] transition-colors">{product.name}</h3>
              </Link>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg md:text-xl font-black text-[#8A3324]">{product.price} <span className="text-xs">ج.م</span></span>
                {product.old_price && (
                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.old_price}</span>
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
    <main className="pb-20 bg-[#F9F9F9]">
      
      <HeroSlider />
      
      <Features />

      <div id="products" className="text-center mt-6 mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 inline-block relative tracking-tight">
          الأكثر <span className="text-[#8A3324]">مبيعاً</span>
        </h2>
        <p className="text-gray-500 mt-3 font-medium">اكتشف تشكيلتنا المختارة بعناية</p>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-gray-500 text-lg">جاري تحميل المنتجات...</div>}>
        <ProductsList />
      </Suspense>
      
    </main>
  )
}