import { useProductCommentQuery } from "api/product"
import CommentListItem from "./CommentListItem"

interface CommentListProps {
  productId: string
}

const CommentList = ({ productId }: CommentListProps) => {
  const productCommentQuery = useProductCommentQuery(productId)

  if (productCommentQuery.isError || productCommentQuery.isLoading || productCommentQuery.isIdle) {
    return <div></div>
  }

  const commentList = productCommentQuery.data.result

  return (
    <>
      <div className="flex flex-col">
        <div className="py-4 px-5">
          <span className="text-base font-bold text-typo">코멘트</span>
        </div>
        <div>
          <ul className="flex flex-col gap-y-4 last-of-type:mb-4">
            {commentList.map((item, index) => (
              <CommentListItem key={index} commentInfo={item} />
            ))}
          </ul>
        </div>
        <div
          className="text-typogray flex h-[35px] w-full items-center justify-center
      bg-lightgray text-sm font-medium"
        >
          모두 보기
        </div>
      </div>
    </>
  )
}

export default CommentList
