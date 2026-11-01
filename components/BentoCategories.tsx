import Link from 'next/link';

export default function BentoCategories({ categories }: { categories: any[] }) {
  if (!categories || categories.length === 0) return null;

  // بناخد أول 3 أقسام نعرضهم بشكل Bento
  const mainCats = categories.slice(0, 3);
  const fallbackImg = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-[#1A120B]">تسوق <span className="text-[#8A3324]">حسب القسم</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[600px]">
        
        {/* القسم الأول (كبير) */}
        {mainCats[0] && (
          <Link href={`#products`} className="bento-card md:col-span-2 md:row-span-2 h-[300px] md:h-full group">
            <img src={mainCats[0].image_url || fallbackImg} alt={mainCats[0].name} />
            <div className="bento-content">
              <span className="bg-[#D4A373] text-[#1A120B] px-3 py-1 rounded-full text-xs font-black mb-3 inline-block">الأكثر طلباً</span>
              <h3 className="text-3xl md:text-5xl font-black">{mainCats[0].name}</h3>
            </div>
          </Link>
        )}

        {/* القسم الثاني (صغير) */}
        {mainCats[1] && (
          <Link href={`#products`} className="bento-card h-[250px] md:h-full group">
            <img src={mainCats[1].image_url || fallbackImg} alt={mainCats[1].name} />
            <div className="bento-content">
              <h3 className="text-2xl font-black">{mainCats[1].name}</h3>
            </div>
          </Link>
        )}

        {/* القسم الثالث (صغير) */}
        {mainCats[2] && (
          <Link href={`#products`} className="bento-card h-[250px] md:h-full group">
            <img src={mainCats[2].image_url || fallbackImg} alt={mainCats[2].name} />
            <div className="bento-content">
              <h3 className="text-2xl font-black">{mainCats[2].name}</h3>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}