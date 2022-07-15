interface ProductImageProps {
  imageUrl?: string
}

const ProductImage = ({ imageUrl }: ProductImageProps) => {
  return (
    <>
      <section className="relative mx-auto aspect-[4/3] overflow-hidden py-8 lg:aspect-video lg:h-[600px] lg:w-full">
        <img src={imageUrl} className="h-full w-full object-contain" alt="product" />
        <div className="absolute bottom-0 h-20 w-full bg-product-image-shade"></div>
        <div className="absolute left-5 top-2 flex items-center">
          {imageUrl ? (
            <img src="/images/back-button.svg" className="mr-2 h-6 w-6" alt="뒤로 가기" />
          ) : (
            <div>no image</div>
          )}
          <span className="text-sm leading-none text-gray-600">뒤로 가기</span>
        </div>
      </section>
      <div className="h-2 w-full bg-lightgray"></div>
    </>
  )
}

export default ProductImage
