import zustand from "zustand";

interface Props {
  modalOpen: boolean
  setModalOpen: () => void
  setModalClose: () => void
}

export const useModalStore = zustand<Props>((set) => ({
  modalOpen: false,
  setModalOpen: () => set({ modalOpen: true }),
  setModalClose: () => set({ modalOpen: false })
}))