import { products } from '@/lib/data'
import ProductDetails from '../../components/ProductDetails'
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const product = products.find(p => p.id === params.id)
  return {
    title: product?.name || 'Product Not Found',
    description: product?.description,
  }
}

export default function Page({ 
  params,
  searchParams 
}: { 
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  return <ProductDetails product={product} />
} 