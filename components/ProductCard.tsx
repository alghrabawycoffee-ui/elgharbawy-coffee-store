"use client"; 
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  // الصورة البديلة لو المنتج ملوش صورة
  const fallbackImage = "/images/bag.jpg"; 

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت الإضافة للسلة`);
  };

  return (
    <div className="group bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full">
      
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-[#F9F6F0] rounded-[1.5rem] overflow-hidden mb-4 block">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
        />
        {product.old_price && (
          <span className="absolute top-4 right-4 bg-[#A44222] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            عرض
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-grow text-center px-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-bold text-[#1A120B] mb-2 truncate group-hover:text-[#A44222] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex flex-col items-start">
            <span className="text-lg font-black text-[#A44222]">{product.price} <span className="text-xs">ج.م</span></span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through">{product.old_price}</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-10 h-10 bg-[#1A120B] text-white rounded-full flex items-center justify-center hover:bg-[#A44222] transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}