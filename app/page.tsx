import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
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

  const [productsRes, categoriesRes, contentRes] = await Promise.all([
    productsQuery,
    supabase.from('categories').select('*'),
    supabase.from('site_content').select('*')
  ]);

  const products = productsRes.data || [];
  const categories = categoriesRes.data || [];
  const allContent = contentRes.data || [];

  const contentMap: any = {};
  allContent.forEach(item => { contentMap[item.key] = item.value; });

  const title = searchQuery 
    ? `نتائج البحث: "${searchQuery}"` 
    : (categoryId ? categories.find(c => c.id === categoryId)?.name : 'المنتجات');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      
      {/* شريط الأقسام */}
      {categories.length > 0 && (
        <div className="py-6 border-b border-gray-100">
          <div className="flex overflow-x-auto gap-8 pb-2 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <Link 
                href={`/?category=${cat.id}#products`} 
                key={cat.id} 
                className={`text-[14px] whitespace-nowrap pb-2 border-b-2 transition-all duration-300 ${
                  categoryId === cat.id 
                    ? 'text-[#8B3A1A] border-[#8B3A1A] font-bold' 
                    : 'text-gray-500 border-transparent hover:text-[#8B3A1A] font-normal'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="py-12">
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          
          {(categoryId || searchQuery) ? (
            <Link href="/#products" className="flex items-center gap-1 text-sm font-bold text-[#8B3A1A] hover:underline">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          ) : (
            <Link href="#products" className="text-sm font-bold text-[#8B3A1A] hover:underline">
              عرض الكل
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed max-w-2xl mx-auto">
            <p className="text-base font-medium text-gray-500">لا توجد منتجات مطابقة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* الشريط المتحرك */}
      {contentMap.show_marquee === 'true' && (
        <div className="bg-gray-50 border-y border-gray-100 py-3 overflow-hidden flex whitespace-nowrap mb-12" dir="ltr">
          <div className="animate-marquee flex gap-10 items-center text-[13px] font-medium tracking-wide text-gray-500">
             <span>{contentMap.marquee_text}</span>
             <span>{contentMap.marquee_text}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <main className="bg-white min-h-screen">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">جاري التحميل...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}