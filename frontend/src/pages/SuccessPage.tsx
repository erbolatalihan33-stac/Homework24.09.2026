import { Link } from 'react-router-dom'
export default function SuccessPage() { return <main className="center-state success"><p className="eyebrow">Спасибо</p><h1>Заказ принят.</h1><p>Мы получили ваши данные и скоро свяжемся для подтверждения.</p><Link className="primary-button" to="/profile">Открыть профиль</Link></main> }
