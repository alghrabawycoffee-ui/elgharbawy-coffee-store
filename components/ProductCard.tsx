"use client"; 
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const fallbackImage = "/images/bag.jpg";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} للسلة`);
  };

  return (
    <div className="group flex flex-col w-full">
      
      {/* حاوية الصورة (خلفية دافئة وزوايا ناعمة) */}
      <Link href={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-[#F9F6F0] rounded-3xl overflow-hidden mb-5 block">
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* شارة الخصم */}
        {product.old_price && (
          <span className="absolute top-4 right-4 bg-[#1A120B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            خصم
          </span>
        )}

        {/* زرار الإضافة السريع (بيظهر عند الـ Hover) */}
        <button 
          onClick={handleAdd}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A120B] font-bold py-3 rounded-xl flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#1A120B] hover:text-white"
        >
          <ShoppingBag className="w-4 h-4" /> إضافة سريعة
        </button>
      </Link>

      {/* تفاصيل المنتج (تحت الصورة مباشرة) */}
      <div className="text-center px-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[15px] md:text-[17px] font-bold text-gray-900 mb-1 truncate group-hover:text-[#8B3A1A] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-400 font-medium mb-2">قهوة مختصة</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[15px] font-bold text-[#8B3A1A]">LE {product.price}.00</span>
          {product.old_price && (
            <span className="text-[13px] text-gray-300 line-through">LE {product.old_price}.00</span>
          )}
        </div>
      </div>
    </div>
  );
}