import Link from 'next/link';
import { Star } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: any }) {
  const fallbackImage = "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group flex flex-col relative w-full">
      
      <Link href={`/product/${product.id}`} className="relative h-44 md:h-64 bg-[#FDFBF7] rounded-[1.5rem] flex items-center justify-center p-4 w-full overflow-hidden block">
        <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-gray-800 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
          جديد
        </span>
        <img 
          src={product.image_url || fallbackImage} 
          alt={product.name}
          className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out z-0 mix-blend-multiply drop-shadow-xl"
        />
      </Link>

      <div className="p-3 md:p-5 text-center flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-center gap-0.5 text-yellow-400 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
          </div>
          
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px] md:min-h-[50px] group-hover:text-[#8A3324] transition-colors">{product.name}</h3>
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-lg md:text-xl font-black text-[#8A3324]">{product.price} <span className="text-xs">ج.م</span></span>
            {product.old_price && (
              <span className="text-xs md:text-sm text-gray-400 line-through">{product.old_price}</span>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}