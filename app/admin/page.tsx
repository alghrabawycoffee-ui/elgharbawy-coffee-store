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
      
      {/* الأقسام */}
      {categories.length > 0 && (
        <div className="py-16 border-b border-gray-200/60">
          <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = categoryId === cat.id;
              return (
                <Link href={`/?category=${cat.id}#products`} key={cat.id} className="flex-shrink-0 group">
                  <div className="flex flex-col items-center gap-3 w-24">
                    <div className={`w-20 h-20 rounded-full overflow-hidden border-[3px] p-1 transition-all bg-white shadow-sm ${isActive ? 'border-[#8A3324] scale-105' : 'border-transparent group-hover:border-[#D4A373]'}`}>
                      <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className={`text-xs font-bold text-center transition-colors ${isActive ? 'text-[#8A3324]' : 'text-gray-600'}`}>{cat.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="py-16">
        <div className="flex flex-col items-center mb-12 relative text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1A120B] mb-3 tracking-tight">{content.productsTitle}</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium">{content.productsSubtitle}</p>
          
          {(categoryId || searchQuery) && (
            <Link href="/#products" className="mt-6 flex items-center gap-1 text-sm font-bold text-red-500 bg-red-50 px-5 py-2 rounded-full hover:bg-red-100 transition-colors">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 max-w-2xl mx-auto">
            <p className="text-xl font-bold text-gray-600">لا توجد منتجات مطابقة لبحثك.</p>
            <Link href="/" className="text-[#8A3324] font-bold mt-4 inline-block hover:underline">تصفح كل المنتجات</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
    <main className="bg-[#FDFBF7]">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري تحميل الصفحة...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}