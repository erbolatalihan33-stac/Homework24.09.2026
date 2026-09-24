// AI-GENERATED: ChatGPT
import axios from 'axios'
import type { Category, Order, Product, User } from '../types'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api' })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('store_token')
  if (token) config.headers.Authorization = `Token ${token}`
  return config
})

export const productService = {
  list: (params: { search?: string; category?: string; ordering?: string }) => api.get<Product[]>('/products/', { params }),
  get: (id: string) => api.get<Product>(`/products/${id}/`),
  categories: () => api.get<Category[]>('/categories/'),
}
export const authService = {
  login: (data: { username: string; password: string }) => api.post<{ token: string; user: User }>('/auth/login/', data),
  register: (data: { username: string; email: string; password: string }) => api.post<{ token: string; user: User }>('/auth/register/', data),
  me: () => api.get<User>('/auth/me/'),
}
export const orderService = {
  list: () => api.get<Order[]>('/orders/'),
  create: (data: { customer_name: string; phone: string; address: string; items: { product: number; quantity: number }[] }) => api.post<Order>('/orders/', data),
}
export default api
