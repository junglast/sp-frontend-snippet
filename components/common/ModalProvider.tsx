import { useRecoilValue } from "recoil"
import { modalIdsAtom } from "store/common"
import LoginModal from "./modal/LoginModal"

const ModalProvider = () => {
  const modalIds = useRecoilValue(modalIdsAtom)

  return (
    <>
      <LoginModal />
    </>
  )
}

export default ModalProvider
