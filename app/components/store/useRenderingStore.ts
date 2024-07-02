import zustand from "zustand";

interface Props {
  reload: boolean
  setReload: (state: boolean) => void
}

/**
 * 강제로 재랜더링이 필요한 경우 사용
 * modal이 없거나, 너무 멀다거나 등등
 */
export const useRenderingStore = zustand<Props>((set) => ({
  reload: false,
  setReload: (state) => set({ reload: state })
}))