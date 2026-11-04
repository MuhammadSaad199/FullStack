export interface Book {
  id: number
  title: string
  author: string
  price: number
  description: string
}

export type BookInput = Omit<Book, 'id'>

// Backend ke /api/book endpoints (token useApi khud laga deta hai)
export function useBooks() {
  const api = useApi()

  const getBooks = async () => {
    const { data } = await api.get<Book[]>('/book')
    return data
  }

  const getBookById = async (id: number) => {
    const { data } = await api.get<Book>(`/book/${id}`)
    return data
  }

  const createBook = async (payload: BookInput) => {
    const { data } = await api.post<Book>('/book', payload)
    return data
  }

  const updateBook = async (id: number, payload: BookInput) => {
    const { data } = await api.put<Book>(`/book/${id}`, { id, ...payload })
    return data
  }

  const deleteBook = async (id: number) => {
    await api.delete(`/book/${id}`)
  }

  return { getBooks, getBookById, createBook, updateBook, deleteBook }
}
