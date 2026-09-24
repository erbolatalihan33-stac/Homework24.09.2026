import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

// # AI-ASSISTED: ChatGPT 
export default function AuthPage({ register = false }: { register?: boolean }) {
	const navigate = useNavigate()
	const location = useLocation()
	const [form, setForm] = useState({ username: '', email: '', password: '' })
	const [error, setError] = useState('')

	function submit(event: FormEvent) {
		event.preventDefault()

		const request = register
			? authService.register(form)
			: authService.login({ username: form.username, password: form.password })

		request
			.then(({ data }) => {
				localStorage.setItem('store_token', data.token)
				localStorage.setItem('store_user', JSON.stringify(data.user))
				navigate((location.state as { from?: string })?.from || '/profile')
			})
			.catch(() => setError('Проверьте данные и повторите попытку'))
	}

	return (
		<main className="auth">
			<p className="eyebrow">MARCHÉ / аккаунт</p>
			<h1>{register ? 'Создать аккаунт' : 'С возвращением'}</h1>
			<form onSubmit={submit}>
				<input
					required
					placeholder="Имя пользователя"
					value={form.username}
					onChange={(event) => setForm({ ...form, username: event.target.value })}
				/>
				{register && (
					<input
						required
						type="email"
						placeholder="Email"
						value={form.email}
						onChange={(event) => setForm({ ...form, email: event.target.value })}
					/>
				)}
				<input
					required
					type="password"
					placeholder="Пароль"
					value={form.password}
					onChange={(event) => setForm({ ...form, password: event.target.value })}
				/>
				<button className="primary-button">
					{register ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</form>
			{error && <p className="error">{error}</p>}
			<p>
				{register ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}{' '}
				<Link to={register ? '/login' : '/register'}>
					{register ? 'Войти' : 'Создать'}
				</Link>
			</p>
		</main>
	)
}
