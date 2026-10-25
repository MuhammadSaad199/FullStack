export interface Book {
  id: number
  title: string
  author: string
  price: number
  description: string
}

// Placeholder data until the backend API is ready
const books: Book[] = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 29.99, description: 'A handbook of agile software craftsmanship.' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', price: 34.99, description: 'Your journey to mastery.' },
  { id: 3, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', price: 24.99, description: 'A modern introduction to programming.' }
]

export function useBooks() {
  const getBooks = () => books

  const getBookById = (id: number) => books.find(book => book.id === id)

  return { getBooks, getBookById }
}
