import API, { AuthAPI } from '../api/AuthAPI'
import { LoginData } from '../interfaces/auth/login-data.interface'
import { RegistrationData } from '../interfaces/auth/registration-data.interface'
import router from '../utils/Router'
import store from '../utils/Store'
import { Routes } from '../enums/routes.enum'

class AuthController {
	private readonly api: AuthAPI

	constructor() {
		this.api = API
	}

	async signin(data: LoginData) {
		try {
			console.log('signin', data)
			await this.api.signin(data)
			console.log('signin this.state getState', store.getState())
			await this.fetchUser()
			router.go(Routes.Settings)
			console.log('signin Before router.go(Routes.Settings)')

			return
		} catch (e: any) {
			console.error(e)
			return e
		}
	}

	async signup(data: RegistrationData) {
		try {
			console.log('signup 1111')

			await this.api.signup(data)
			console.log('signup 2222')

			await this.fetchUser()
			console.log('signup 3333')
			router.go(Routes.Settings)
			return
		} catch (e: any) {
			console.error(e)
			return e
		}
	}

	async fetchUser() {
		try {
			const user = await this.api.read()
			store.set('user.user_data', user)
		} catch (e: any) {
			console.error('fetchUser', e)
			return e
		}
	}

	async logout() {
		try {
			await this.api.logout()
			store.set('user.user_data', null)
			store.set('currentChatId', null)
			router.go(Routes.Login)
		} catch (e: any) {
			console.error(e.message)
		}
	}
}

export default new AuthController()
