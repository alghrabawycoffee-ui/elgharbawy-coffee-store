"use client"; 
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "/images/bag.jpg";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} للسلة`);
  };

  return (
    <div className="bg-white p-4 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 rounded-xl">
      
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-white mb-4 block overflow-hidden rounded-lg">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-grow text-center px-2">
        {/* اسم المنتج: خط عادي مش تقيل */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-[15px] font-medium text-gray-700 mb-1 truncate group-hover:text-[#A44222] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          {/* السعر: واضح بس مش ضخم */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-bold text-gray-800">LE {product.price}.00</span>
            {product.old_price && (
              <span className="text-[11px] text-gray-400 line-through">LE {product.old_price}.00</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-full bg-white border border-gray-200 text-gray-600 text-xs font-semibold py-2.5 rounded-md transition-all duration-300 hover:bg-[#A44222] hover:text-white hover:border-[#A44222]"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}