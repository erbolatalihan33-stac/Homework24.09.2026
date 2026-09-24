export type Category = { id: number; name: string; description: string }
export type Product = { id: number; name: string; description: string; price: string; image: string; category: number; category_name: string; stock: number; created_at: string }
export type CartItem = { product: Product; quantity: number }
export type Order = { id: number; customer_name: string; phone: string; address: string; status: string; total_price: string; created_at: string; items: { id: number; product: number; product_name: string; quantity: number; price: string }[] }
export type User = { id: number; username: string; email: string }
