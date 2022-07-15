import { GetServerSidePropsContext, NextPage } from "next"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { getProductDetail, useProductDetailQuery } from "api/product"
import CommentList from "components/product/CommentList"
import InteractionButtons from "components/product/InteractionButtons"
import ProductImage from "components/product/ProductImage"
import ProductMetadata from "components/product/ProductMetadata"
import ProductRatingSetter from "components/product/ProductRatingSetter"
import ProductDetailHead from "components/product/ProductDetailHead"

interface ProductDetailProps {
  productId: string
}

const ProductDetail: NextPage<ProductDetailProps> = ({ productId }) => {
  const productDetailQuery = useProductDetailQuery(productId)

  if (productDetailQuery.isLoading || productDetailQuery.isIdle) return <div>loading</div>
  if (productDetailQuery.isError) return <div>error</div>

  const productDetail = productDetailQuery.data.result
  const { productName, imageUrl } = productDetail

  return (
    <div className="relative h-full">
      <ProductDetailHead productName={productName} />
      <ProductImage imageUrl={imageUrl} />
      <ProductMetadata productDetail={productDetail} />
      <ProductRatingSetter />
      <InteractionButtons />
      <CommentList productId={productId} />
    </div>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const productId = Array.isArray(query.productId) ? query.productId[0] : (query.productId as string)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["product", productId], () => getProductDetail(productId))

  return {
    props: {
      productId,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ProductDetail
