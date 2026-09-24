import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  return <article className="product-card"><Link to={`/products/${product.id}`}><div className="product-image"><img src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700'} alt={product.name} /></div><div className="product-meta"><span>{product.category_name}</span><strong>{product.name}</strong><p>{Number(product.price).toLocaleString('ru-RU')} ₽</p></div></Link><button disabled={!product.stock} onClick={() => add(product)}>{product.stock ? 'В корзину' : 'Нет в наличии'}</button></article>
}
