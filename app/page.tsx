import { Suspense } from 'react'
import { getSupabase } from '../lib/supabase'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import BrandStory from '../components/BrandStory' 
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

  const [productsRes, contentRes, categoriesRes] = await Promise.all([
    productsQuery,
    supabase.from('site_content').select('key, value').in('key', ['products_title', 'products_subtitle']),
    supabase.from('categories').select('*')
  ]);

  const products = productsRes.data || [];
  const contentData = contentRes.data || [];
  const categories = categoriesRes.data || [];
  
  const content = {
    productsTitle: searchQuery 
      ? `نتائج البحث عن: "${searchQuery}"` 
      : (categoryId 
          ? categories.find(c => c.id === categoryId)?.name || 'المنتجات' 
          : (contentData.find(c => c.key === 'products_title')?.value || 'الأكثر مبيعاً')),
    productsSubtitle: contentData.find(c => c.key === 'products_subtitle')?.value || 'اكتشف تشكيلتنا المختارة بعناية',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      
      {/* الأقسام - شكل خط رفيع وأنيق */}
      {categories.length > 0 && (
        <div className="py-12 border-b border-gray-200">
          <div className="flex overflow-x-auto gap-8 pb-4 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = categoryId === cat.id;
              return (
                <Link href={`/?category=${cat.id}#products`} key={cat.id} className={`text-sm font-bold pb-2 border-b-2 transition-colors whitespace-nowrap ${isActive ? 'text-[#8A3324] border-[#8A3324]' : 'text-gray-500 border-transparent hover:text-[#1C1512]'}`}>
                  {cat.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div className="text-center md:text-right">
            <h2 className="text-4xl md:text-6xl font-light text-[#1C1512] mb-2">{content.productsTitle}</h2>
            <p className="text-gray-500 text-sm font-medium">{content.productsSubtitle}</p>
          </div>
          {(categoryId || searchQuery) && (
            <Link href="/#products" className="mt-4 md:mt-0 flex items-center gap-1 text-sm font-bold text-[#8A3324] hover:underline">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-light text-gray-500">لا توجد منتجات مطابقة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <BrandStory />
    </div>
  );
}

export default function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <main className="bg-[#F9F6F0]">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-light">جاري التحميل...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}