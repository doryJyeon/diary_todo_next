import { create } from "zustand";

interface Props {
  modalOpen: boolean
  setModalOpen: () => void
  setModalClose: () => void
}

export const useModalStore = create<Props>((set) => ({
  modalOpen: false,
  setModalOpen: () => typeof window !== 'undefined' && set({ modalOpen: true }),
  setModalClose: () => typeof window !== 'undefined' && set({ modalOpen: false })
}))