import { create } from "zustand"


interface CreateProps {
  date: string
  weather: string
  feeling: string
  content: string
  setDate: (newDate: string) => void
  setWeather: (icon: string) => void
  setFeeling: (icon: string) => void
  setContent: (text: string) => void
}

export const useDiaryStore = create<CreateProps>((set) => ({
  date: "",
  weather: "",
  feeling: "",
  content: "",
  setDate: (newDate) => set({ date: newDate }),
  setWeather: (icon) => set({ weather: icon }),
  setFeeling: (icon) => set({ feeling: icon }),
  setContent: (text) => set({ content: text }),
}))