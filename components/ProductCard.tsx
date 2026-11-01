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
    <div className="bg-white rounded-2xl p-4 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      
      {/* الصورة */}
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-[#F9F8F6] rounded-xl mb-4 block overflow-hidden">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.old_price && (
          <span className="absolute top-3 right-3 bg-[#A44222] text-white text-[10px] font-bold px-2 py-1 rounded-md">
            خصم
          </span>
        )}
      </Link>

      {/* التفاصيل */}
      <div className="flex flex-col flex-grow text-center">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[15px] font-medium text-gray-800 mb-2 truncate group-hover:text-[#A44222] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[15px] font-semibold text-[#1A120B]">LE {product.price}.00</span>
            {product.old_price && (
              <span className="text-[12px] text-gray-400 line-through">LE {product.old_price}.00</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-full bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-2.5 rounded-lg hover:bg-[#A44222] hover:text-white hover:border-[#A44222] transition-all duration-300"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}