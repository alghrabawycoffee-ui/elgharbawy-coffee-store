import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#3E2723] text-white">
      
      {/* الصورة */}
      <div className="w-full md:w-1/2 h-[300px] md:h-auto">
        <img 
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="حبوب القهوة" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* النص */}
      <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">ولدت من طقوس القهوة المصرية</h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
          مستوحاة من ثقافة القهوة الدافئة في القاهرة، تقدم "الغرباوي" تجربة قهوة غنية ونكهة سلسة. 
          نقدم لك أجود حبوب البن المحمصة بعناية لتناسب ذوقك، من القهوة التركية إلى الإسبريسو.
        </p>
        <Link href="/" className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-bold text-sm w-fit hover:bg-white hover:text-[#3E2723] transition-colors">
          اعرف المزيد
        </Link>
      </div>
    </section>
  );
}