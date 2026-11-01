import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import BrandStory from '../components/BrandStory' 
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
      {/* الأقسام - شكل كبسولات أنيق */}
      {categories.length > 0 && (
        <div className="container mx-auto px-4 md:px-10 pt-24 pb-12">
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar justify-center">
            {categories.map((cat) => (
              <Link href="#products" key={cat.id} className="group">
                <div className="flex items-center gap-3 bg-white border border-gray-100 hover:border-[#D4A373] rounded-full p-2 pr-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="container mx-auto px-4 md:px-10 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A120B] tracking-tight mb-4">{content.productsTitle}</h2>
          <p className="text-gray-500 text-base font-medium max-w-xl mx-auto">{content.productsSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
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
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري تحميل الصفحة...</div>}>
        <PageContent />
      </Suspense>
      <AppPromo />
    </main>
  )
}