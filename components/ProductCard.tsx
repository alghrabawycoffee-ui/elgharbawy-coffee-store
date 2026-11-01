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
    <Link href={`/product/${product.id}`} className="group block w-full">
      <div className="relative flex flex-col items-center">
        
        {/* حاوية الصورة - خلفية دافية وزوايا ناعمة جداً */}
        <div className="relative w-full aspect-[4/5] bg-[#F4EFEA] rounded-3xl flex items-center justify-center p-8 mb-6 transition-all duration-500 group-hover:bg-[#EBE3DB]">
          
          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name}
            className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-xl"
          />
          
          {/* شارة "جديد" أو "خصم" */}
          {product.old_price && (
            <div className="absolute top-4 right-4 bg-white text-[#8A3324] text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
              خصم
            </div>
          )}

          {/* زرار الإضافة - يظهر بشكل أنيق */}
          <button 
            onClick={handleAdd}
            className="absolute bottom-4 right-4 w-11 h-11 bg-[#1A120B] text-white rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8A3324] shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* التفاصيل - بدون أي إطارات */}
        <div className="text-center w-full px-2">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 truncate group-hover:text-[#8A3324] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base font-black text-[#8A3324]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through font-bold">{product.old_price} ج.م</span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}