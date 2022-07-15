import SearchBar from "components/search/SearchBar"
import ProductList from "components/search/searchList/ProductList"
import useQueryString from "hooks/useQueryString"
import { NextPage } from "next"

/* 검색 결과 페이지 */
const SearchList: NextPage = () => {
  const keyword = useQueryString("keyword")

  return (
    <div className="relative h-full">
      <SearchBar defaultKeyword={keyword} showRecentKeywords={false} />
      {keyword && <ProductList keyword={keyword} />}
    </div>
  )
}

export default SearchList
