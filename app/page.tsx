import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import Features from '../components/Features'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import Link from 'next/link'

// 1. مكون جلب المنتجات
async function ProductsList() {
  const supabase = getSupabase(); 
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) return <div className="text-center text-red-500 p-10 font-bold">حدث خطأ في جلب البيانات</div>
  if (!products || products.length === 0) return <p className="text-center text-gray-500 py-10 font-bold">لا توجد منتجات حالياً.</p>

  return (
    // على الموبايل: سلايدر أفقي (flex + overflow-x-auto + snap) 
    // على الكمبيوتر: جريد عادي (md:grid + md:overflow-visible)
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-10 py-6 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8 md:overflow-visible hide-scrollbar">
      {products.map((product: any) => (
        <div key={product.id} className="min-w-[70vw] sm:min-w-[40vw] md:min-w-0 snap-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

// 2. الصفحة الرئيسية
export default function Home() {
  // أقسام المتجر (تقدر تغير الصور دي براحتك)
  const categories = [
    { name: 'حبوب القهوة', icon: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'أدوات التقطير', icon: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'الماكينات', icon: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'أكواب ومجات', icon: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <main className="pb-10 bg-[#FDFBF7] overflow-hidden">
      
      {/* 1. البانر السينمائي */}
      <HeroSlider />
      
      {/* 2. شريط المميزات */}
      <Features />

      {/* 3. الأقسام (شكل دائري زي التطبيقات) */}
      <div className="container mx-auto px-4 md:px-10 mt-12 mb-8">
        <h2 className="text-xl md:text-2xl font-black text-[#1A120B] mb-6">تسوق حسب القسم</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {categories.map((cat, i) => (
            <Link href="#products" key={i} className="flex flex-col items-center gap-3 snap-center shrink-0 group">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-[#D4A373] transition-all duration-300 group-hover:-translate-y-1">
                <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-sm md:text-base font-bold text-gray-700 group-hover:text-[#8A3324] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. المنتجات الأكثر مبيعاً */}
      <div id="products" className="container mx-auto md:px-6 pt-6">
        <div className="flex justify-between items-end mb-6 px-4 md:px-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-[#1A120B]">الأكثر <span className="text-[#8A3324]">مبيعاً</span></h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">اكتشف تشكيلتنا المختارة بعناية</p>
          </div>
          <Link href="#" className="text-sm font-bold text-[#8A3324] hover:underline mb-1">عرض الكل</Link>
        </div>

        <Suspense fallback={<div className="text-center py-10 text-gray-500 font-bold">جاري تحميل المنتجات...</div>}>
          <ProductsList />
        </Suspense>
      </div>

      {/* 5. قسم تحميل التطبيق */}
      <AppPromo />
      
    </main>
  )
}