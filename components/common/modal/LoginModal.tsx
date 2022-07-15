import { useRef } from "react"
import { Drawer } from "@mantine/core"
import API_URL from "constants/api"
import useOAuthFlow from "hooks/useOAuthFlow"
import useModal from "hooks/useModal"

const LoginModal = () => {
  const {
    modalState: { isOpen, title },
    closeModal,
  } = useModal("loginModal")

  const oAuthWindow = useRef<Window | null>()

  const handleKakaoButtonClick = () => {
    oAuthWindow.current = window.open(`${process.env.NEXT_PUBLIC_API_URL}${API_URL.USER_LOGIN_KAKAO}`)
  }

  const handleGoogleButtonClick = () => {
    oAuthWindow.current = window.open(`${process.env.NEXT_PUBLIC_API_URL}${API_URL.USER_LOGIN_GOOGLE}`)
  }

  /* OAuth 연동 팝업이 보내주는 결과 받기 */
  useOAuthFlow(oAuthWindow)

  return (
    <Drawer
      opened={isOpen}
      onClose={closeModal}
      classNames={{
        drawer: "round bg-transparent focus:shadow-none",
      }}
      position="bottom"
      size="fit-content"
      padding={0}
      transitionDuration={500}
      hideCloseButton
      noCloseOnEscape
      noFocusTrap
    >
      <div className="w-full items-center rounded-tl-xl rounded-tr-xl bg-white py-6 px-5 pb-2">
        <div className="mx-auto flex max-w-mobile-max-width flex-col">
          <h3 className="mb-8 text-center text-base font-medium leading-normal">
            {title || "로그인하고 내 스낵 활동을 확인하세요!"}
          </h3>
          <button
            className="relative mb-2 h-12 rounded-lg bg-[#fee500] font-medium text-black active:outline-0"
            onClick={handleKakaoButtonClick}
          >
            <div className="absolute left-[10px] top-1/2 h-8 w-8 translate-y-[-50%] rounded-lg p-[7px]">
              <img src="/images/common/kakao.svg" className="h-full w-full object-contain" alt="kakao" />
            </div>
            <span className="tracking-tight">카카오로 시작하기</span>
          </button>
          <button
            className="relative mb-2 h-12 rounded-lg bg-[#4285f4] font-medium text-white"
            onClick={handleGoogleButtonClick}
          >
            <div className="absolute left-[10px] top-1/2 h-8 w-8 translate-y-[-50%] rounded-lg bg-white p-[7px]">
              <img src="/images/common/google.svg" className="h-full w-full object-contain" alt="google" />
            </div>
            <span className="tracking-tight">구글 계정으로 시작하기</span>
          </button>
          <button className="ml-auto h-10 px-2 text-sm leading-none text-gray-600" onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </Drawer>
  )
}

export default LoginModal
