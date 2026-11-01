import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import Features from '../components/Features'
import ProductCard from '../components/ProductCard'
import AppPromo from '../components/AppPromo'
import BrandStory from '../components/BrandStory' // استدعاء قصة البراند
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

async function PageContent() {
  const supabase = getSupabase(); 
  const [productsRes, contentRes] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }),
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
      {/* 1. الأقسام (شكل كبسولات فخمة) */}
      <div className="container mx-auto px-4 md:px-10 pt-20 pb-10">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#1A120B]">{content.categoriesTitle}</h2>
        </div>
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {categories.map((cat, i) => (
            <Link href="#products" key={i} className="snap-center shrink-0 group">
              <div className="flex items-center gap-3 bg-white border border-gray-100 hover:border-[#D4A373] rounded-full p-2 pr-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8A3324] transition-colors">
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#8A3324] transition-colors">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. المنتجات (شكل المعرض) */}
      <div id="products" className="bg-white py-20 rounded-[4rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.05)] relative z-20">
        <div className="container mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 px-4 md:px-4 gap-4">
            <div className="text-center md:text-right">
              <h2 className="text-4xl md:text-5xl font-black text-[#1A120B] tracking-tight">{content.productsTitle}</h2>
              <p className="text-gray-500 mt-3 text-sm md:text-base font-medium">{content.productsSubtitle}</p>
            </div>
            <Link href="#" className="flex items-center gap-2 text-sm font-black bg-[#FDFBF7] px-6 py-3 rounded-full text-[#8A3324] hover:bg-[#8A3324] hover:text-white transition-all">
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 px-4 md:px-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && <p className="text-center w-full col-span-full text-gray-500 font-bold py-10">لا توجد منتجات حالياً.</p>}
          </div>
        </div>
      </div>

      {/* 3. قصة البراند (الجزء اللي بيعمل الـ WOW) */}
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
      <Features /> 
    </main>
  )
}