import { NextPage } from "next"
import { useRouter } from "next/router"

import CommentListItem from "components/product/CommentListItem"
import { useProductCommentQuery } from "api/product"
import useQueryString from "hooks/useQueryString"

const Comment: NextPage = () => {
  const router = useRouter()
  const goBack = () => router.back()

  const productId = useQueryString("productId")
  console.log(productId)

  const productCommentQuery = useProductCommentQuery(productId)

  if (!productId) return <div></div>

  if (productCommentQuery.isError || productCommentQuery.isLoading || productCommentQuery.isIdle) {
    return <div></div>
  }

  const commentList = productCommentQuery.data.result

  return (
    <div className="h-full">
      <div className="flex w-full items-center py-4 px-5">
        <button onClick={goBack} className="text-sm font-medium text-gray-600">
          <div className="flex items-center">
            <img src="/images/back-button.svg" className="mr-2 h-6 w-6" alt="뒤로 가기" />
            <span className="absolute left-[52px] text-sm leading-none text-gray-600">뒤로 가기</span>
          </div>
        </button>
        <div className="flex flex-1 justify-center text-sm font-bold text-typo">코멘트</div>
        <button className="text-sm text-gray-600">확인</button>
      </div>
      <div className="flex flex-col gap-y-4 last-of-type:pb-4">
        {commentList.map((item, index) => {
          return <CommentListItem commentInfo={item} key={index} />
        })}
      </div>
    </div>
  )
}
export default Comment
