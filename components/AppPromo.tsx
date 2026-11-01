import { Smartphone, Download } from 'lucide-react';

export default function AppPromo() {
  return (
    <section className="mx-4 md:mx-8 my-16 bg-[#1A120B] rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
      {/* خلفية ديكور */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A3324] rounded-full filter blur-[100px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A373] rounded-full filter blur-[100px] opacity-30"></div>

      <div className="relative z-10 md:w-1/2 text-center md:text-right mb-10 md:mb-0">
        <span className="bg-white/10 text-[#D4A373] text-xs font-bold px-4 py-2 rounded-full mb-6 inline-block border border-white/10">
          تطبيق الغرباوي
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          قهوتك المفضلة <br />
          <span className="text-[#D4A373]">بين يديك.</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-md mx-auto md:mx-0">
          حمل تطبيقنا الآن واستمتع بتجربة تسوق أسرع، وتتبع طلباتك بسهولة، وعروض حصرية للتطبيق فقط.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="flex items-center justify-center gap-3 bg-white text-[#1A120B] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            <Smartphone className="w-5 h-5" /> App Store
          </button>
          <button className="flex items-center justify-center gap-3 bg-[#8A3324] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5A1F14] transition-colors">
            <Download className="w-5 h-5" /> Google Play
          </button>
        </div>
      </div>

      <div className="relative z-10 md:w-1/2 flex justify-center">
        {/* موك-أب للموبايل */}
        <div className="w-[250px] h-[500px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl relative overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl z-20"></div>
           <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="App" className="w-full h-full object-cover opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-10">
             <h3 className="text-white font-black text-2xl">الغرباوي</h3>
           </div>
        </div>
      </div>
    </section>
  );
}