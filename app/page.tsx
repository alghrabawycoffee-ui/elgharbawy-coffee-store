import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import Features from '../components/Features'
import BrandStory from '../components/BrandStory'
import Testimonials from '../components/Testimonials'
import Link from 'next/link'
import { X } from 'lucide-react'

async function PageContent({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const supabase = getSupabase(); 
  const resolvedParams = await searchParams;
  const categoryId = resolvedParams.category as string;
  const searchQuery = resolvedParams.q as string;

  let productsQuery = supabase.from('products').select('*').order('created_at', { ascending: false });
  if (categoryId) productsQuery = productsQuery.eq('category_id', categoryId);
  if (searchQuery) productsQuery = productsQuery.ilike('name', `%${searchQuery}%`);

  // جلب كل النصوص
  const [productsRes, categoriesRes, contentRes] = await Promise.all([
    productsQuery,
    supabase.from('categories').select('*'),
    supabase.from('site_content').select('*')
  ]);

  const products = productsRes.data || [];
  const categories = categoriesRes.data || [];
  const allContent = contentRes.data || [];

  // تحويل النصوص لمصفوفة سهلة الاستخدام
  const contentMap: any = {};
  allContent.forEach(item => { contentMap[item.key] = item.value; });

  const title = searchQuery ? `نتائج البحث: "${searchQuery}"` : (categoryId ? categories.find(c => c.id === categoryId)?.name : 'المنتجات');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      
      {categories.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <div className="flex overflow-x-auto gap-6 pb-2 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <Link href={`/?category=${cat.id}#products`} key={cat.id} className={`text-sm font-bold whitespace-nowrap pb-2 border-b-2 transition-colors ${categoryId === cat.id ? 'text-[#A44222] border-[#A44222]' : 'text-gray-600 border-transparent hover:text-[#A44222]'}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div id="products" className="py-12">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">{title}</h2>
          {(categoryId || searchQuery) ? (
            <Link href="/#products" className="flex items-center gap-1 text-sm font-bold text-[#A44222] hover:underline">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          ) : (
            <Link href="#products" className="text-sm font-bold text-[#A44222] hover:underline">عرض الكل</Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
            <p className="text-lg font-bold text-gray-500">لا توجد منتجات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* الشريط المتحرك - بيظهر لو show_marquee = true */}
      {contentMap.show_marquee === 'true' && (
        <div className="bg-[#FDFBF7] border-y border-gray-200 py-3 overflow-hidden flex whitespace-nowrap mb-12" dir="ltr">
          <div className="animate-marquee flex gap-8 items-center text-sm font-bold text-gray-500">
             <span>{contentMap.marquee_text}</span>
             <span>{contentMap.marquee_text}</span>
          </div>
        </div>
      )}

      {/* المميزات - بتظهر لو show_features = true */}
      {contentMap.show_features === 'true' && (
        <Features content={contentMap} />
      )}

      {/* قصة البراند - بتظهر لو show_story = true */}
      {contentMap.show_story === 'true' && (
        <BrandStory content={contentMap} />
      )}

      {/* آراء العملاء - بتظهر لو show_testimonials = true */}
      {contentMap.show_testimonials === 'true' && (
        <Testimonials content={contentMap} />
      )}

    </div>
  );
}

export default function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري التحميل...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}