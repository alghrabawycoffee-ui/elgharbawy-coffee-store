import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import BrandStory from '../components/BrandStory' 
import BentoCategories from '../components/BentoCategories'

async function PageContent() {
  const supabase = getSupabase(); 
  const [productsRes, contentRes, categoriesRes] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }),
    supabase.from('site_content').select('key, value').in('key', ['products_title', 'products_subtitle']),
    supabase.from('categories').select('*')
  ]);

  const products = productsRes.data || [];
  const contentData = contentRes.data || [];
  const categories = categoriesRes.data || [];
  
  const content = {
    productsTitle: contentData.find(c => c.key === 'products_title')?.value || 'الأكثر مبيعاً',
    productsSubtitle: contentData.find(c => c.key === 'products_subtitle')?.value || 'اكتشف تشكيلتنا المختارة بعناية',
  };

  return (
    <>
      <BentoCategories categories={categories} />

      <div id="products" className="max-w-7xl mx-auto px-4 md:px-10 py-20 border-t border-gray-200/60 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A120B] tracking-tighter mb-2">{content.productsTitle}</h2>
            <p className="text-gray-500 text-base font-medium">{content.productsSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <BrandStory />
    </>
  );
}

export default function Home() {
  return (
    <main className="bg-[#FDFBF7]">
      
      {/* شريط Marquee متحرك */}
      <div className="bg-[#1A120B] text-[#D4A373] py-3 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 text-sm font-bold uppercase tracking-widest">
          <span>أجود حبوب القهوة المختصة</span>
          <span>•</span>
          <span>توصيل سريع لجميع المحافظات</span>
          <span>•</span>
          <span>محمص طازج يومياً</span>
          <span>•</span>
          <span>أجود حبوب القهوة المختصة</span>
          <span>•</span>
          <span>توصيل سريع لجميع المحافظات</span>
          <span>•</span>
          <span>محمص طازج يومياً</span>
          <span>•</span>
        </div>
      </div>

      <HeroSlider />
      
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري تحميل الصفحة...</div>}>
        <PageContent />
      </Suspense>
      
      <AppPromo />
    </main>
  )
}