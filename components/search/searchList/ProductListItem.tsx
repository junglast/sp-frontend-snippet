import PAGES from "constants/pages"
import Link from "next/link"
import { Product } from "types/product"

interface ProductListItemProps {
  productInfo: Product
}

const ProductListItem = ({ productInfo }: ProductListItemProps) => {
  const { productId, productName, manufacturer, series, flavor, texture, imageUrl, thumbnailImageUrl } = productInfo

  return (
    <>
      <li className="box-content flex h-20 w-full">
        <Link href={`${PAGES.PRODUCT}/${productId}`} passHref>
          {imageUrl ? (
            <img src={thumbnailImageUrl} className="mr-4 h-full w-20 rounded-lg object-contain p-1" alt={productName} />
          ) : (
            <div className="mr-4 h-full w-20 rounded-lg bg-gray-300"></div>
          )}
        </Link>
        <div className="flex h-full flex-1 flex-col justify-center">
          <span className="mb-2 text-sm leading-none text-gray-600">{manufacturer}</span>
          <Link href={`${PAGES.PRODUCT}/${productId}`} passHref>
            <span className="mb-3 text-base font-medium leading-none">{productName}</span>
          </Link>

          <div className="flex gap-x-1">
            {["#main_flavor", "#sub_flavor"].map((item, index) => (
              <span className="text-sm leading-none text-gray-600" key={index + "tag"}>
                {item}
              </span>
            ))}
            <span className="text-sm leading-none text-gray-600">#{texture}</span>
          </div>
        </div>
      </li>
      <div className="h-px w-full bg-gray-200 bg-clip-content pl-24 last-of-type:hidden"></div>
    </>
  )
}

export default ProductListItem
