"use client"; 
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
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
    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
      
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-[#F9F9F9] rounded-lg overflow-hidden mb-4 block">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-grow text-center">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 line-clamp-1 hover:text-[#D35400] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg font-black text-[#D35400]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through">{product.old_price}</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-full bg-[#D35400] text-white text-sm font-bold py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-[#A04000] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" /> أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}