"use client";
import { useCartStore } from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product);
    // إظهار إشعار النجاح
    toast.success(`تم إضافة ${product.name} للسلة! 🛒`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full bg-[#5A1F14] text-[#D4A373] hover:bg-[#8A3324] hover:text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto"
    >
      <ShoppingCart className="w-5 h-5" /> 
      أضف للسلة
    </button>
  );
}