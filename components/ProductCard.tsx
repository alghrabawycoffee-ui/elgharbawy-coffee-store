"use client"; 
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} للسلة`);
  };

  return (
    <div className="group relative flex flex-col items-center bg-white p-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
      
      {/* الصورة - بدون حدود، خلفية دافية */}
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-[#F4EFEA] rounded-[1.5rem] flex items-center justify-center p-6 overflow-hidden mb-4">
        {product.old_price && (
          <div className="absolute top-3 right-3 bg-[#8A3324] text-white text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-sm">
            خصم
          </div>
        )}
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </Link>

      {/* التفاصيل */}
      <div className="text-center w-full px-2 pb-2 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 truncate group-hover:text-[#8A3324] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mt-auto mb-4">
          <span className="text-lg font-black text-[#8A3324]">{product.price} <span className="text-xs">ج.م</span></span>
          {product.old_price && (
            <span className="text-xs text-gray-400 line-through font-bold">{product.old_price}</span>
          )}
        </div>

        <button 
          onClick={handleAdd}
          className="w-full bg-[#1A120B] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#8A3324] transition-colors"
        >
          <Plus className="w-4 h-4" /> أضف للسلة
        </button>
      </div>
    </div>
  );
}