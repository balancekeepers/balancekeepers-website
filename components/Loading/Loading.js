import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="The Balance Keepers"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}