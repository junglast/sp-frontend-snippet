import { Drawer } from "@mantine/core"
import CommentModal from "components/product/CommentModal"
import useAuthInfo from "hooks/useAuthInfo"
import useModal from "hooks/useModal"

const InteractionButtons = () => {
  const commentModal = useModal("commentModal")
  const loginModal = useModal("loginModal")

  const { isLoggedIn } = useAuthInfo()

  const handleCommentWriteButton = () => {
    if (!isLoggedIn) {
      loginModal.setModal((state) => ({
        ...state,
        isOpen: true,
        title: "코멘트 작성을 위해 로그인이 필요해요!",
      }))

      return
    }

    commentModal.openModal()
  }

  return (
    <>
      <div className="flex w-full justify-around px-5 py-4">
        <button className="flex flex-col items-center justify-center">
          <img src="/images/product/like.svg" className="mb-2 h-6 w-6" alt="좋아요" />
          <span className="text-sm text-gray-600">좋아요</span>
        </button>
        <button onClick={handleCommentWriteButton} className="flex flex-col items-center justify-center">
          <img src="/images/product/comment.svg" className="mb-2 h-6 w-6" alt="코멘트" />
          <span className="text-sm text-gray-600">코멘트</span>
        </button>
        <button className="flex flex-col items-center justify-center">
          <img src="/images/product/share.svg" className="mb-2 h-6 w-6" alt="공유" />
          <span className="text-sm text-gray-600">공유</span>
        </button>
      </div>
      <div className="h-2 w-full bg-lightgray"></div>

      <CommentModal />
    </>
  )
}

export default InteractionButtons
