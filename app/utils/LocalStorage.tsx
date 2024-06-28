export const createStorage = (key: string, value: any) => (
  typeof window !== undefined && localStorage.setItem(key, JSON.stringify(value))
)

export const readStorage = (key: string) => {
  if (typeof window !== undefined) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

export const updateStorage = (key: string, value: any) => (
  typeof window !== undefined && localStorage.setItem(key, JSON.stringify(value))
)

export const deleteStorage = (key: string) => (
  typeof window !== undefined && localStorage.removeItem(key)
)