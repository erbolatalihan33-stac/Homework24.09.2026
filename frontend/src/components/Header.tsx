import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { count } = useCart()
  return <header className="site-header"><Link className="brand" to="/"><span>М</span> MARCHÉ</Link><nav><Link to="/">Каталог</Link><Link to="/profile">Профиль</Link><Link className="cart-link" to="/cart">Корзина <b>{count}</b></Link></nav></header>
}
