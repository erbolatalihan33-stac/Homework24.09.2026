// AI-GENERATED: ChatGPT
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

type CartContextValue = { items: CartItem[]; count: number; total: number; add: (product: Product) => void; change: (id: number, quantity: number) => void; remove: (id: number) => void; clear: () => void }
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('store_cart') || '[]') as CartItem[])
  useEffect(() => localStorage.setItem('store_cart', JSON.stringify(items)), [items])
  function add(product: Product) { setItems((current) => { const found = current.find((item) => item.product.id === product.id); return found ? current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item) : [...current, { product, quantity: 1 }] }) }
  function change(id: number, quantity: number) { setItems((current) => quantity <= 0 ? current.filter((item) => item.product.id !== id) : current.map((item) => item.product.id === id ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item)) }
  const value = { items, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0), add, change, remove: (id: number) => change(id, 0), clear: () => setItems([]) }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used inside CartProvider'); return context }
