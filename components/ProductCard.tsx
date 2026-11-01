"use client"; 
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "/images/bag.jpg"; // بياخد من فولدرك لو مفيش صورة

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} للسلة`);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-[#F9F9F9] rounded-xl overflow-hidden mb-4 block">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {product.old_price && (
          <span className="absolute top-2 right-2 bg-[#A44222] text-white text-[10px] font-bold px-2 py-1 rounded-md">
            خصم
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-grow text-center">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#A44222] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg font-black text-[#A44222]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through">{product.old_price}</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-full bg-[#1A120B] text-white text-sm font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#A44222] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" /> أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}