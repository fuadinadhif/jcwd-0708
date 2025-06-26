import ProductData from "@/components/product-data";
import React from "react";

export default async function DetailProduct({
  params,
}: {
  params: Promise<{ objectId: string }>;
}) {
  const objectId = (await params).objectId;

  return (
    <main className="py-6 px-4">
      <div className="p-4 bg-amber-100 text-black text-center mb-2">
        Product is still in the experimental phase
      </div>
      <React.Suspense fallback={<p>📦 Loading product...</p>}>
        <ProductData objectId={objectId} />
      </React.Suspense>
    </main>
  );
}
