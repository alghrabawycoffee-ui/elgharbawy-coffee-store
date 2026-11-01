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

  const [productsRes, categoriesRes] = await Promise.all([
    productsQuery,
    supabase.from('categories').select('*')
  ]);

  const products = productsRes.data || [];
  const categories = categoriesRes.data || [];
  
  const title = searchQuery ? `نتائج البحث: "${searchQuery}"` : (categoryId ? categories.find(c => c.id === categoryId)?.name : 'الأكثر مبيعاً');

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      
      {/* الأقسام */}
      {categories.length > 0 && (
        <div className="py-12 border-b border-gray-200">
          <div className="flex overflow-x-auto gap-8 pb-4 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = categoryId === cat.id;
              return (
                <Link href={`/?category=${cat.id}#products`} key={cat.id} className={`flex-shrink-0 flex flex-col items-center gap-3 group`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 p-1 transition-all bg-white shadow-sm ${isActive ? 'border-[#A44222]' : 'border-gray-200 group-hover:border-[#D4A373]'}`}>
                    <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className={`text-xs md:text-sm font-bold transition-colors ${isActive ? 'text-[#A44222]' : 'text-gray-600'}`}>{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="py-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-gray-200 pb-6 gap-4">
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-5xl font-black text-[#1A120B] mb-2">{title}</h2>
            <p className="text-gray-500 text-sm md:text-base font-medium">اكتشف تشكيلتنا المختارة بعناية</p>
          </div>
          {(categoryId || searchQuery) && (
            <Link href="/#products" className="flex items-center gap-1 text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed max-w-2xl mx-auto">
            <p className="text-xl font-bold text-gray-500">لا توجد منتجات مطابقة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <main className="bg-[#FDFBF7] min-h-screen">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري التحميل...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}