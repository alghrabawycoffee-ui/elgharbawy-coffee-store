import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FDFBF7]">
      <h1 className="text-7xl md:text-9xl font-black text-[#8A3324] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">عذراً، الصفحة غير موجودة</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">يبدو أنك وصلت إلى رابط غير صحيح، أو أن الصفحة تم نقلها أو حذفها.</p>
      <Link href="/" className="bg-[#8A3324] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5A1F14] transition-colors shadow-lg">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}