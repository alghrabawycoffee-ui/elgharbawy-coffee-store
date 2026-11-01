import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase' // التعديل هنا
import { Star } from 'lucide-react'
import AddToCartButton from '../components/AddToCartButton'

// 1. مكون منفصل لجلب وعرض المنتجات من الداتابيز
async function ProductsList() {
  const supabase = getSupabase(); // التعديل هنا: استدعاء الدالة جوة المكون

  // سحب البيانات من Supabase
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) {
    return <div className="text-center text-red-500 p-10">حدث خطأ في جلب البيانات: {error.message}</div>
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 py-10">لا توجد منتجات في الداتابيز حالياً.</p>
  }

  // صورة بديلة في حالة عدم وجود صورة للمنتج
  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10 py-10 container mx-auto">
      {products.map((product: any) => (
        <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
          
          {/* صورة المنتج */}
          <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4 w-full overflow-hidden">
            <span className="absolute top-4 right-4 bg-[#8A3324] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              جديد
            </span>
            <img 
              src={product.image_url || fallbackImage} 
              alt={product.name}
              className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 z-0"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="p-5 text-center flex flex-col flex-grow justify-between">
            <div>
              {/* النجوم */}
              <div className="flex justify-center gap-1 text-yellow-400 mb-3">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current text-gray-200" />
              </div>
              
              {/* اسم المنتج */}
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{product.name}</h3>
              
              {/* السعر */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="text-xl font-black text-[#8A3324]">{product.price} ج.م</span>
                {product.old_price && (
                  <span className="text-sm text-gray-400 line-through">{product.old_price} ج.م</span>
                )}
              </div>
            </div>

            {/* زرار إضافة للسلة (مكون منفصل) */}
            <AddToCartButton product={product} />
          </div>
        </div>
      ))}
    </div>
  )
}

// 2. الصفحة الرئيسية
export default function Home() {
  return (
    <main className="pb-20">
      {/* عنوان القسم */}
      <div className="text-center mt-12 mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 inline-block relative">
          الأكثر <span className="text-[#8A3324]">مبيعاً</span>
          {/* الخط اللي تحت الكلمة */}
          <span className="absolute -bottom-3 left-0 w-full h-1 bg-[#D4A373] rounded-full"></span>
        </h2>
      </div>

      {/* قائمة المنتجات مع Suspense عشان نتجنب مشاكل Next.js 16 */}
      <Suspense fallback={<div className="text-center py-20 text-gray-500 text-lg">جاري تحميل المنتجات...</div>}>
        <ProductsList />
      </Suspense>
    </main>
  )
}