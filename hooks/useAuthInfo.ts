import { useUserInfoQuery } from "api/auth"
import { UserInfo } from "types/auth"

interface UseAuthInfoResult extends Partial<UserInfo> {
  isLoggedIn: boolean
}

const useAuthInfo = (): UseAuthInfoResult => {
  const userInfoQuery = useUserInfoQuery()

  if (userInfoQuery.isLoading || userInfoQuery.isIdle || userInfoQuery.isError)
    return {
      isLoggedIn: false,
    }

  return {
    isLoggedIn: true,
    ...userInfoQuery.data.result,
  }
}

export default useAuthInfo
