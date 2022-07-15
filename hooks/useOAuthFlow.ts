/* 팝업창으로 OAuth 연동 flow 진행 */
import { MutableRefObject, useEffect } from "react"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"
import PAGES from "constants/pages"
import useLocalStorage from "./useLocalStorage"
import useModal from "./useModal"

interface OAuthMessage {
  isSnackpotUser: boolean
  snackpotToken?: string
  serviceProvider?: string
  serviceProviderUserId?: string
  serviceProviderNickname?: string
}

const useOAuthFlow = (oAuthWindow: MutableRefObject<Window | null | undefined>) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setAuthToken = useLocalStorage("authToken", "")[1]

  const { closeModal } = useModal("loginModal")

  useEffect(() => {
    const oAuthMessageListener = (message) => {
      const oAuthMessage: OAuthMessage = message.data
      const { isSnackpotUser } = oAuthMessage

      /* OAuth 팝업에서 보내주는 메시지만 수신 */
      if (!("isSnackpotUser" in oAuthMessage)) return

      /* 0. OAuth 팝업 및 로그인 모달 닫기 */
      if (oAuthWindow.current) oAuthWindow.current.close()
      closeModal()

      /* 1. 기존 회원인 경우 */
      if (isSnackpotUser) {
        // 1-1. 토큰 저장
        setAuthToken(oAuthMessage.snackpotToken as string)

        // 1-2. 유저 정보 갱신
        queryClient.invalidateQueries(["auth"])

        /* 2. 처음 가입하거나 추가 정보를 입력하지 않은 경우 */
      } else {
        const { serviceProvider, serviceProviderUserId, serviceProviderNickname } = oAuthMessage

        // 2-1. 추가 정보 입력 화면으로 redirect
        router.push({
          pathname: PAGES.REGISTER_ADDITIONAL_INFO,
          query: { serviceProvider, serviceProviderUserId, serviceProviderNickname },
        })
      }
    }

    window.addEventListener("message", oAuthMessageListener, false)

    return () => {
      window.removeEventListener("message", oAuthMessageListener)
    }
  }, [])
}

export default useOAuthFlow
