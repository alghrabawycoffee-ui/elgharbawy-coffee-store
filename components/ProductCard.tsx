import Link from 'next/link';
import { Star, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // عشان ميفتحش صفحة المنتج لما ندوس على الزرار
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} للسلة`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block w-full">
      <div className="relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-transparent hover:border-gray-100 flex flex-col h-full">
        
        {/* شارة "جديد" */}
        <div className="absolute top-5 right-5 z-20">
          <span className="bg-[#FDFBF7] text-[#8A3324] border border-[#8A3324]/10 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
            جديد
          </span>
        </div>

        {/* الصورة */}
        <div className="relative h-48 md:h-64 w-full bg-[#FDFBF7] rounded-[1.5rem] flex items-center justify-center overflow-hidden mb-5">
          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name}
            className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
          />
          
          {/* زرار الإضافة السريع يظهر عند الوقوف بالماوس */}
          <button 
            onClick={handleAdd}
            className="absolute bottom-4 right-4 w-10 h-10 bg-[#1A120B] text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8A3324] shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col flex-grow px-2">
          <div className="flex items-center gap-1 text-[#D4A373] mb-2">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current text-gray-200" />
            <span className="text-[10px] text-gray-400 font-bold mr-1">(4.8)</span>
          </div>
          
          <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#8A3324] transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-xl font-black text-[#8A3324]">{product.price}</span>
              <span className="text-xs font-bold text-gray-500">ج.م</span>
              {product.old_price && (
                <span className="text-xs text-gray-300 line-through font-bold">{product.old_price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}