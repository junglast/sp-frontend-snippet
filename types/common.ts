/* 모달 관련 */
export type ModalId = "loginModal" | "sideMenu" | "commentModal"

export interface Modal {
  id: ModalId
  isOpen: boolean
  title?: string
  onCancel?: () => void
  onSubmit?: () => void
}

/* API 관련 */
export interface ApiResponse<T> {
  code: ApiResponseCode
  message?: string
  result: T
}

export interface ApiErrorResponse {
  code: ApiResponseCode
  message?: string
  result?: unknown
}

export enum ApiResponseCode {
  OK = "OK",
  NO_DATA = "NO_DATA",
  DUPLICATE = "DUPLICATE",
  NO_PERMISSION = "NO_PERMISSION",
  OAUTH_NOT_AGREED = "OAUTH_NOT_AGREED",
  ERROR = "ERROR",
  DB_ERROR = "DB_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
}
