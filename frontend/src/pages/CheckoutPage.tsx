import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/api'

// # AI-ASSISTED: ChatGPT 
export default function CheckoutPage() {
	const { items, total, clear } = useCart()
	const navigate = useNavigate()
	const [form, setForm] = useState({ customer_name: '', phone: '', address: '' })
	const [error, setError] = useState('')

	function submit(event: FormEvent) {
		event.preventDefault()

		orderService
			.create({
				...form,
				items: items.map((item) => ({
					product: item.product.id,
					quantity: item.quantity,
				})),
			})
			.then(() => {
				clear()
				navigate('/success')
			})
			.catch(() =>
				setError('Для оформления войдите в аккаунт и проверьте наличие товаров'),
			)
	}

	if (!items.length) {
		return <main className="center-state">Корзина пуста</main>
	}

	return (
		<main className="checkout">
			<div>
				<p className="eyebrow">Последний шаг</p>
				<h1>Оформление заказа</h1>
				<form onSubmit={submit}>
					<input
						required
						placeholder="Имя"
						value={form.customer_name}
						onChange={(event) => setForm({ ...form, customer_name: event.target.value })}
					/>
					<input
						required
						placeholder="Телефон"
						value={form.phone}
						onChange={(event) => setForm({ ...form, phone: event.target.value })}
					/>
					<textarea
						required
						placeholder="Адрес доставки"
						value={form.address}
						onChange={(event) => setForm({ ...form, address: event.target.value })}
					/>
					<button className="primary-button">Подтвердить заказ</button>
				</form>
				{error && <p className="error">{error}</p>}
			</div>
			<aside className="summary">
				<span>К оплате</span>
				<strong>{total.toLocaleString('ru-RU')} ₽</strong>
			</aside>
		</main>
	)
}
