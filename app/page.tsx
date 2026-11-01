import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import Features from '../components/Features'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import Link from 'next/link'

async function PageContent() {
  const supabase = getSupabase(); 
  
  // جلب المنتجات والنصوص مع بعض
  const [productsRes, contentRes] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.from('site_content').select('key, value').in('key', ['categories_title', 'products_title', 'products_subtitle'])
  ]);

  const products = productsRes.data || [];
  const contentData = contentRes.data || [];
  
  const content = {
    categoriesTitle: contentData.find(c => c.key === 'categories_title')?.value || 'تسوق حسب القسم',
    productsTitle: contentData.find(c => c.key === 'products_title')?.value || 'الأكثر مبيعاً',
    productsSubtitle: contentData.find(c => c.key === 'products_subtitle')?.value || 'اكتشف تشكيلتنا المختارة بعناية',
  };

  const categories = [
    { name: 'حبوب القهوة', icon: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'أدوات التقطير', icon: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'الماكينات', icon: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { name: 'أكواب ومجات', icon: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-10 mt-12 mb-8">
        <h2 className="text-xl md:text-2xl font-black text-[#1A120B] mb-6">{content.categoriesTitle}</h2>
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

      <div id="products" className="container mx-auto md:px-6 pt-6">
        <div className="flex justify-between items-end mb-6 px-4 md:px-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-[#1A120B]">{content.productsTitle}</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">{content.productsSubtitle}</p>
          </div>
          <Link href="#" className="text-sm font-bold text-[#8A3324] hover:underline mb-1">عرض الكل</Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-10 py-6 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8 md:overflow-visible hide-scrollbar">
          {products.map((product: any) => (
            <div key={product.id} className="min-w-[70vw] sm:min-w-[40vw] md:min-w-0 snap-center">
              <ProductCard product={product} />
            </div>
          ))}
          {products.length === 0 && <p className="text-center w-full text-gray-500 font-bold py-10">لا توجد منتجات حالياً.</p>}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="pb-10 bg-[#FDFBF7] overflow-hidden">
      <HeroSlider />
      <Features />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري تحميل الصفحة...</div>}>
        <PageContent />
      </Suspense>
      <AppPromo />
    </main>
  )
}