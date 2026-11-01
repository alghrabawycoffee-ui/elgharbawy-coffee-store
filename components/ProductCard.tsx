"use client"; 
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت الإضافة للسلة`);
  };

  return (
    <div className="group flex flex-col w-full">
      {/* الصورة - مساحة فاضية بدون حدود */}
      <Link href={`/product/${product.id}`} className="relative w-full aspect-[3/4] flex items-center justify-center mb-6 overflow-hidden">
        {product.old_price && (
          <span className="absolute top-2 right-2 text-[#8A3324] text-[10px] font-bold uppercase tracking-wider z-10">
            عرض خاص
          </span>
        )}
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-xl"
        />
      </Link>

      {/* التفاصيل */}
      <div className="text-center flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-light text-[#1C1512] mb-1 truncate group-hover:text-[#8A3324] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mt-1 mb-4">
          <span className="text-sm font-bold text-[#1C1512]">{product.price} ج.م</span>
          {product.old_price && (
            <span className="text-xs text-gray-400 line-through font-light">{product.old_price}</span>
          )}
        </div>

        <button 
          onClick={handleAdd}
          className="mt-auto text-xs font-bold text-[#8A3324] uppercase tracking-wider border-b border-transparent hover:border-[#8A3324] pb-1 transition-all mx-auto"
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}