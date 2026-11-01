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
        
        {/* حاوية الصورة */}
        <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-[2.5rem] flex items-center justify-center p-8 mb-6 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
          
          <img 
            src={product.image_url || fallbackImage} 
            alt={product.name}
            className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-xl"
          />
          
          {/* زرار الإضافة العائم */}
          <button 
            onClick={handleAdd}
            className="absolute bottom-6 right-6 w-12 h-12 bg-white text-[#1A120B] rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8A3324] hover:text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* التفاصيل (نصوص بس) */}
        <div className="text-center w-full px-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {product.category || 'قهوة مختصة'}
          </p>
          <h3 className="text-base font-black text-gray-900 mb-2 truncate group-hover:text-[#8A3324] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-black text-[#8A3324]">{product.price} ج.م</span>
            {product.old_price && (
              <span className="text-sm text-gray-300 line-through font-bold">{product.old_price} ج.م</span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}