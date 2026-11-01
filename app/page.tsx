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
        <div className="py-8 border-b border-gray-200">
          <div className="flex overflow-x-auto gap-6 pb-2 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <Link href={`/?category=${cat.id}#products`} key={cat.id} className="flex-shrink-0 group">
                <div className="flex flex-col items-center gap-2 w-20">
                  <div className={`w-16 h-16 rounded-full overflow-hidden border-2 p-0.5 transition-all bg-white ${categoryId === cat.id ? 'border-[#A44222]' : 'border-gray-200 group-hover:border-[#A44222]'}`}>
                    <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className={`text-xs font-bold text-center ${categoryId === cat.id ? 'text-[#A44222]' : 'text-gray-600'}`}>{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* المنتجات */}
      <div id="products" className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800">{title}</h2>
          {(categoryId || searchQuery) && (
            <Link href="/#products" className="flex items-center gap-1 text-sm font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100">
              <X className="w-4 h-4" /> مسح الفلتر
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
            <p className="text-lg font-bold text-gray-500">لا توجد منتجات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
    <main className="bg-[#FAFAFA] min-h-screen">
      <HeroSlider />
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">جاري التحميل...</div>}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}