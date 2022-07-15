import { atom, atomFamily, selectorFamily, DefaultValue } from "recoil"
import { ModalId, Modal } from "types/common"

/* Modal의 ID 리스트 */
export const modalIdsAtom = atom<ModalId[]>({
  key: "modalIdsAtom",
  default: [],
})

const modalsAtomFamily = atomFamily<Modal, ModalId>({
  key: "modalsAtomFamily",
  default: (id) => ({
    id,
    isOpen: false,
    title: "",
  }),
})

export const modalsSelectorFamily = selectorFamily<Modal, ModalId>({
  key: "modalsSelectorFamily",

  get:
    (modalId) =>
    ({ get }) =>
      get(modalsAtomFamily(modalId)),

  set:
    (modalId) =>
    ({ set, reset }, modalInfo) => {
      if (modalInfo instanceof DefaultValue) {
        reset(modalsAtomFamily(modalId))
        set(modalIdsAtom, (prevValue) => prevValue.filter((item) => item !== modalId))

        return
      }

      set(modalsAtomFamily(modalId), modalInfo)
      set(modalIdsAtom, (prev) => Array.from(new Set([...prev, modalInfo.id])))
    },
})
