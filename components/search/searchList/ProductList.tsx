import { useSearchResultQuery } from "api/search"
import React from "react"
import NoResult from "./NoResult"
import ProductListItem from "./ProductListItem"

interface ProductListProps {
  keyword: string
}

const ProductList = ({ keyword }: ProductListProps) => {
  const searchResultQuery = useSearchResultQuery(keyword)

  if (searchResultQuery.isIdle || searchResultQuery.isLoading) {
    return <h1>Loading...</h1>
  }

  if (searchResultQuery.isError) {
    return <h1>error</h1>
  }

  const { result } = searchResultQuery.data

  if (!result?.length) return <NoResult keyword={keyword} />

  return (
    <div className="flex-1 bg-gray-100 pt-2">
      <div className="bg-white py-4 px-5">
        <ul className="flex flex-col gap-y-3">
          {result.map((item, index) => (
            <ProductListItem productInfo={item} key={index} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductList
