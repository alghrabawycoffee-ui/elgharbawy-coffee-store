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
    toast.success(`تمت الإضافة للسلة`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block w-full">
      <div className="relative flex flex-col">
        
        {/* حاوية الصورة - خلفية رمادية ناعمة جداً */}
        <div className="relative w-full aspect-[3/4] bg-[#F4EFEA] rounded-[2rem] flex items-center justify-center p-6 mb-4 overflow-hidden transition-all duration-500 group-hover:bg-[#EBE3DB]">
          
          {/* علامة "عرض" */}
          {product.old_price && (
            <div className="absolute top-4 right-4 bg-[#8A3324] text-white text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-sm">
              خصم
            </div>
          )}

          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          {/* زرار إضافة سريع يظهر من تحت */}
          <button 
            onClick={handleAdd}
            className="absolute bottom-4 left-4 right-4 bg-[#1A120B] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8A3324]"
          >
            <Plus className="w-4 h-4" /> إضافة سريعة
          </button>
        </div>

        {/* التفاصيل */}
        <div className="text-center px-2">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 truncate group-hover:text-[#8A3324] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-sm font-black text-[#8A3324]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through font-bold">{product.old_price} ج.م</span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}