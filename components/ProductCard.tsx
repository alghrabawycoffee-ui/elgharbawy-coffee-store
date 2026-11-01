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
    <div className="bg-white p-4 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 rounded-xl">
      
      <Link href={`/product/${product.id}`} className="relative w-full aspect-square bg-white mb-4 block overflow-hidden rounded-lg">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {product.old_price && (
          <span className="absolute top-2 right-2 bg-[#A44222] text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
            خصم
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-grow text-center">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm md:text-base font-bold text-gray-600 mb-2 truncate group-hover:text-[#A44222] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-bold text-gray-500">LE {product.price}.00</span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through">LE {product.old_price}.00</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="w-full bg-white border border-gray-300 text-gray-700 text-sm font-bold py-2 rounded-md transition-all duration-300 group-hover:bg-[#A44222] group-hover:text-white group-hover:border-[#A44222]"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}