import React, { useReducer } from 'react'

function isSupported(getStorage) {
	try {
		const key = '__some_random_key_you_are_not_going_to_use__'
		getStorage().setItem(key, key)
		getStorage().removeItem(key)
		return true
	} catch (e) {
		return false
	}
}

export const isBrowser = () => typeof window !== 'undefined'
export const isLocalStorageSupported = () => isSupported(() => localStorage)
export const getStorageItem = (key, defaultValue) => (isBrowser() && isLocalStorageSupported() && window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : defaultValue)
const setStorageItem = (key, value) => (isLocalStorageSupported() ? window.localStorage.setItem(key, JSON.stringify(value)) : '')

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
	modalVisible: getStorageItem('modalVisible', false), // convert string to boolean value
	registrationModalVisible: false,
	notificationVisible: false,
	messages: [],
	cookieBannerVisible: getStorageItem('cookieBannerVisible', true),
	mapVisible: getStorageItem('mapVisible', true),
}

// const init = () => {
// 	return {
// 		modalVisible: getStorageItem('modalVisible', false), // convert string to boolean value
// 		registrationModalVisible: false,
// 		notificationVisible: false,
// 		messages: [],
// 		cookieBannerVisible: getStorageItem('cookieBannerVisible', true),
// 		mapVisible: getStorageItem('mapVisible', false),
// 	}
// }

function reducer(state, action) {
	switch (action.type) {
		case 'TOGGLE_MODAL': {
			return {
				...state,
				modalVisible: !state.modalVisible,
			}
		}
		case 'TOGGLE_REGISTRATION_MODAL': {
			return {
				...state,
				registrationModalVisible: !state.registrationModalVisible,
			}
		}
		case 'UPDATE_NOTIFICATION': {
			return {
				...state,
				notificationVisible: action.notificationVisible,
				messages: action.messages,
			}
		}
		case 'HIDE_NOTIFICATION': {
			return {
				...state,
				notificationVisible: false,
			}
		}
		case 'HIDE_COOKIEBANNER': {
			setStorageItem('cookieBannerVisible', false)
			return {
				...state,
				cookieBannerVisible: false,
			}
		}
		case 'SHOW_MAP': {
			setStorageItem('mapVisible', true)
			return {
				...state,
				mapVisible: true,
			}
		}
		case 'HIDE_MAP': {
			setStorageItem('mapVisible', false)
			return {
				...state,
				mapVisible: false,
			}
		}
		default:
			throw new Error('Bad action.')
	}
}

const GlobalContextProvider = ({ children }) => {
	// const [state, dispatch] = useReducer(reducer, initialState, init)
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	)
}

export default GlobalContextProvider
