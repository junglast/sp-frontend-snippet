import { useProductDetailQuery } from "api/product"
import Head from "next/head"

interface ProductDetailHeadProps {
  productName: string
}

const ProductDetailHead = ({ productName }: ProductDetailHeadProps) => {
  return (
    <Head>
      <title>{productName} :: snackpot</title>
    </Head>
  )
}

export default ProductDetailHead
