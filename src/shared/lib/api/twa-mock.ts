import WebApp from '@twa-dev/sdk'
import { BiometricManager, BiometricRequestAccessParams, BiometricAuthenticateParams, ShareStoryParams } from '@twa-dev/types'

type TWA = typeof WebApp
type PopupParams = Parameters<TWA['showPopup']>[0]
type User = {
	id: number
	first_name: string
	last_name: string
	username: string
	language_code: string
	is_premium: boolean
}
type InitDataUnsafe = {
	query_id: string
	user: User
	auth_date: number
	hash: string
	start_param: string
}

function convertInitDataUnsafeToInitData(
	initDataUnsafe: InitDataUnsafe
): string {
	const encodedUser = encodeURIComponent(JSON.stringify(initDataUnsafe.user))
	const queryString = `query_id=${encodeURIComponent(initDataUnsafe.query_id)}&user=${encodedUser}&auth_date=${encodeURIComponent(initDataUnsafe.auth_date.toString())}&hash=${encodeURIComponent(initDataUnsafe.hash)}&start_param=${encodeURIComponent(initDataUnsafe.start_param)}`

	return queryString
}

const mockUser = {
	id: 238312266, //Telegram user ID, required to send messages to the user, for tests you can find your ID in the chat with @userinfobot
	first_name: 'John',
	last_name: 'Doe',
	username: 'johndoe2', //Shoud be unique!
	language_code: 'en',
	is_premium: false
}
const initDataUnsafe = {
	query_id: '',
	user: mockUser,
	auth_date: 1234567890,
	hash: 'mock_hash',
	start_param: ''
}

const mockTWA: TWA = {
	initDataUnsafe: initDataUnsafe,
	initData: convertInitDataUnsafeToInitData(initDataUnsafe),
	version: '6.0',
	platform: 'weba',
	colorScheme: 'light',
	themeParams: {
		bg_color: '#ffffff',
		text_color: '#000000',
		hint_color: '#999999',
		link_color: '#2481cc',
		button_color: '#5288c1',
		button_text_color: '#ffffff',
		secondary_bg_color: '#f0f0f0',
		header_bg_color: '#ffffff',
		accent_text_color: '#3a3a3a',
		section_bg_color: '#ffffff',
		section_header_text_color: '#3a3a3a',
		subtitle_text_color: '#999999',
		destructive_text_color: '#ff0000',
		section_separator_color: '#000000'
	},
	isExpanded: true,
	viewportHeight: 600,
	viewportStableHeight: 600,
	isClosingConfirmationEnabled: false,
	headerColor: '#ffffff',
	backgroundColor: '#ffffff',
	BackButton: {
		isVisible: false,
		onClick: (callback: () => void) => {
			callback()
		},
		offClick: (callback: () => void) => {
			callback()
		},
		show: () => {
			console.log('Showing BackButton')
		},
		hide: () => {
			console.log('Hiding BackButton')
		}
	},
	MainButton: {
		text: 'CONTINUE',
		color: '#2481cc',
		textColor: '#ffffff',
		isVisible: false,
		isProgressVisible: false,
		isActive: true,
		setText: (text: string) => {
			console.log('Setting text:', text)
		},
		onClick: (callback: () => void) => {
			callback()
		},
		offClick: (callback: () => void) => {
			callback()
		},
		show: () => {
			console.log('Showing MainButton')
		},
		hide: () => {
			console.log('Hiding MainButton')
		},
		enable: () => {
			console.log('Enabling MainButton')
		},
		disable: () => {
			console.log('Disabling MainButton')
		},
		showProgress: (leaveActive?: boolean) => {
			console.log('Showing progress, leaveActive:', leaveActive)
		},
		hideProgress: () => {
			console.log('Hiding progress')
		},
		setParams: (params: {
			text?: string
			color?: string
			text_color?: string
			is_active?: boolean
			is_visible?: boolean
		}) => {
			console.log('Setting params:', params)
		}
	},
	HapticFeedback: {
		impactOccurred: (
			style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
		) => {
			console.log('Impact occurred:', style)
			return mockTWA.HapticFeedback
		},
		notificationOccurred: (type: 'error' | 'success' | 'warning') => {
			console.log('Notification occurred:', type)
			return mockTWA.HapticFeedback
		},
		selectionChanged: () => {
			console.log('Selection changed')
			return mockTWA.HapticFeedback
		}
	},
	close: () => {
		console.log('Closing WebApp')
	},
	expand: () => {
		console.log('Expanding WebApp')
	},
	readTextFromClipboard: (callback?: (text: string) => void) => {
		if (callback) {
			callback('Mocked clipboard text')
		}
	},
	ready: () => {
		console.log('WebApp is ready')
	},
	sendData: (data: unknown) => {
		console.log('Sending data:', data)
	},
	switchInlineQuery: (query: string, choose_chat_types?: string[]) => {
		console.log('Switching inline query:', query, choose_chat_types)
	},
	openLink: (url: string, options?: { try_instant_view?: boolean} ) => {
		console.log('Opening link:', url, options)
	},
	openTelegramLink: (url: string) => {
		console.log('Opening Telegram link:', url)
	},
	openInvoice: (url: string): Promise<boolean> => {
		console.log('Opening invoice:', url)
		return Promise.resolve(true)
	},
	showPopup: (params: PopupParams, callback?: (id?: string) => unknown) => {
		console.log('Showing popup:', params)
		if (callback) {
			callback(params.buttons?.[0]?.id)
		}
	},
	showAlert: (message: string, callback?: () => void) => {
		console.log('Showing alert:', message)
		if (callback) {
			callback()
		}
	},
	showConfirm: (
		message: string,
		callback?: (isConfirmed: boolean) => void
	) => {
		console.log('Showing confirm:', message)
		if (callback) {
			callback(true)
		}
	},
	enableClosingConfirmation: () => {
		console.log('Enabling closing confirmation')
	},
	disableClosingConfirmation: () => {
		console.log('Disabling closing confirmation')
	},
	onEvent: (eventName: string, eventHandler: (...args: any[]) => unknown) => {
		console.log(`Added event listener for ${eventName}`)
		if (typeof eventHandler === 'function') {
			eventHandler()
		}
	},
	offEvent: (
		eventName: string,
		eventHandler: (...args: any[]) => unknown
	) => {
		console.log(`Removed event listener for ${eventName}`)
		if (typeof eventHandler === 'function') {
			eventHandler()
		}
	},
	CloudStorage: {
		getItem: (key: string): Promise<string | null> => {
			console.log(`Getting item from CloudStorage: ${key}`)
			return Promise.resolve(null)
		},
		setItem: (key: string, value: string): Promise<void> => {
			console.log(`Setting item in CloudStorage: ${key} = ${value}`)
			return Promise.resolve()
		},
		removeItem: (key: string): Promise<void> => {
			console.log(`Removing item from CloudStorage: ${key}`)
			return Promise.resolve()
		},
		getKeys: (): Promise<string[]> => {
			console.log('Getting all keys from CloudStorage')
			return Promise.resolve([])
		},
		removeItems: (keys: string[]): Promise<void> => {
			console.log(
				`Removing multiple items from CloudStorage: ${keys.join(', ')}`
			)
			return Promise.resolve()
		},
		getItems: (keys: string[]): Promise<(string | null)[]> => {
			console.log(
				`Getting multiple items from CloudStorage: ${keys.join(', ')}`
			)
			return Promise.resolve(keys.map(() => null))
		}
	},
	SettingsButton: {
		isVisible: false,
		onClick: (callback: () => void) => {
			console.log('SettingsButton clicked')
			callback()
			return mockTWA.SettingsButton
		},
		offClick: (callback: () => void) => {
			console.log('SettingsButton offClick')
			callback()
			return mockTWA.SettingsButton
		},
		show: () => {
			console.log('Showing SettingsButton')
			return mockTWA.SettingsButton
		},
		hide: () => {
			console.log('Hiding SettingsButton')
			return mockTWA.SettingsButton
		}
	},
	requestWriteAccess: (callback?: (result: boolean) => void) => {
		console.log('Requesting write access')
		if (callback) callback(true)
		return Promise.resolve(true)
	},
	requestContact: (callback?: (result: boolean) => void) => {
		console.log('Requesting contact')
		if (callback) callback(true)
		return Promise.resolve(true)
	},
	showScanQrPopup: (
		params: { text?: string} ,
		callback?: (text: string) => void
	) => {
		console.log('Showing scan QR popup:', params)
		if (callback) callback('mocked_qr_result')
	},
	closeScanQrPopup: () => {
		console.log('Closing scan QR popup')
	},
	setHeaderColor: (color: string) => {
		console.log(`Setting header color to ${color}`)
	},
	setBackgroundColor: (color: string) => {
		console.log(`Setting background color to ${color}`)
	},
	isVersionAtLeast: (version: string): boolean => {
		console.log(`Checking if version is at least ${version}`)
		const currentVersion = mockTWA.version.split('.').map(Number)
		const targetVersion = version.split('.').map(Number)
		for (let i = 0; i < Math.max(currentVersion.length, targetVersion.length); i++) {
			const current = currentVersion[i] || 0
			const target = targetVersion[i] || 0
			if (current > target) return true
			if (current < target) return false
		}
		return true
	},
	BiometricManager: {
		isInited: false,
		isBiometricAvailable: false,
		biometricType: 'unknown',
		isAccessRequested: false,
		isAccessGranted: false,
		isBiometricTokenSaved: false,
		deviceId: '',
		init: function (callback?: VoidFunction): BiometricManager {
			console.log('Initializing BiometricManager', callback)
			throw new Error('Function not implemented.')
		},
		requestAccess: function (params: BiometricRequestAccessParams, callback?: (isAccessGranted: boolean) => void): BiometricManager {
			console.log('Requesting access to biometric', params, callback)
			throw new Error('Function not implemented.')
		},
		authenticate: function (params: BiometricAuthenticateParams, callback?: (isAuthenticated: boolean) => void): BiometricManager {
			console.log('Authenticating biometric', params, callback)
			throw new Error('Function not implemented.')
		},
		updateBiometricToken: function (token: string, callback?: (isBiometricTokenUpdated: boolean) => void): BiometricManager {
			console.log('Updating biometric token', token, callback)
			throw new Error('Function not implemented.')
		},
		openSettings: function (): BiometricManager {
			throw new Error('Function not implemented.')
		}
	},
	isVerticalSwipesEnabled: false,
	enableVerticalSwipes: () => {
		console.log('Enabling vertical swipes')
	},
	disableVerticalSwipes: () => {
		console.log('Disabling vertical swipes')
	},
	shareToStory: function (_mediaURL: string, params?: ShareStoryParams): void {
		console.log('Sharing to story', _mediaURL, params)
		throw new Error('Function not implemented.')
	}
}

export default mockTWA
