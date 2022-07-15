import { useRecoilState, useResetRecoilState } from "recoil"
import { modalsSelectorFamily } from "store/common"
import { ModalId } from "types/common"
import { useRouter } from "next/router"
import { useEffect } from "react"

/* atomFamily로 관리되는 모달 상태를 컨트롤 하는 hook */
const useModal = (modalId: ModalId) => {
  const [modal, setModal] = useRecoilState(modalsSelectorFamily(modalId))
  const resetModal = useResetRecoilState(modalsSelectorFamily(modalId))

  const openModal = () => {
    setModal((current) => ({ ...current, isOpen: true }))
  }

  const closeModal = () => {
    resetModal()
  }

  const router = useRouter()

  useEffect(() => {
    closeModal()
  }, [router.pathname])

  return { modalState: modal, isOpen: modal.isOpen, setModal, openModal, closeModal }
}

export default useModal
