import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Home.module.css'
import { useState } from 'react'

// const isSuccess = false

interface IFormState {
	name: string
	email: string
}

function Home() {
	const { register, handleSubmit, reset } = useForm<IFormState>()
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const onSubmit: SubmitHandler<IFormState> = data => {
		setIsLoading(true)
		fetch('http://localhost:5000/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				if (!data) return

				setIsSuccess(true)
				reset()
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{isSuccess ? (
					<h1 className={styles.success}>Форма отправлена</h1>
				) : (
					<>
						<h1>GTA 6 - Оставь заявку</h1>
						<input
							type='name'
							placeholder='Введите имя'
							{...register('name')}
						/>
						<input
							type='email'
							placeholder='Введите email'
							{...register('email')}
						/>
						<button disabled={isLoading}>
							{isLoading ? 'Отправка...' : 'Хочу GTA'}
						</button>
					</>
				)}
			</form>
		</div>
	)
}

export default Home
