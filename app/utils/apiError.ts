// Axios error se user-friendly message nikalna (ASP.NET ProblemDetails / validation errors bhi)
export const apiError = (e: any, fallback = 'Kuch ghalat ho gaya') => {
  // useAsyncData error ko NuxtError mein wrap karta hai, original axios error `cause` mein hota hai
  const res = e?.response ?? e?.cause?.response
  if (!res) return 'Backend se connect nahi ho saka'
  if (res.status === 401) return 'Session khatam ho gaya, dobara login karein'
  if (res.status === 403) return 'Aapko ye kaam karne ki ijazat nahi hai'
  if (res.status === 404) return 'Book nahi mili'

  const data = res.data
  if (typeof data === 'string' && data) return data
  if (data?.errors) return Object.values(data.errors).flat().join(', ')
  return data?.message || data?.title || fallback
}
