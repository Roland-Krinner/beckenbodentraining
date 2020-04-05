import React, { useReducer } from 'react'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
	modalVisible: false,
	notificationVisible: false,
	messages: [],
	cookieBannerVisible: false,
	mapVisible: true,
}

function reducer(state, action) {
	switch (action.type) {
		case 'TOGGLE_MODAL': {
			return {
				...state,
				modalVisible: !state.modalVisible,
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
			return {
				...state,
				cookieBannerVisible: false,
			}
		}
		case 'SHOW_MAP': {
			return {
				...state,
				mapVisible: true,
			}
		}
		case 'HIDE_MAP': {
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
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	)
}

export default GlobalContextProvider
