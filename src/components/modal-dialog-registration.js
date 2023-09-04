import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import * as Styles from './modal-dialog-registration.module.scss'

const Registration = ({ children, data: { headline } }) => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)
	const modalHeadline = headline || ''
	return (
		<Modal show={state.registrationModalVisible} size="md" aria-labelledby="vertical-modal-title" centered className={`${Styles.modal}`}>
			<Modal.Header closeButton={false}>
				<Modal.Title>{modalHeadline}</Modal.Title>
				<button
					type="button"
					className="close"
					onClick={() => {
						dispatch({ type: 'TOGGLE_REGISTRATION_MODAL' })
					}}
				>
					<span aria-hidden="true">×</span>
					<span className="sr-only">schließen</span>
				</button>
			</Modal.Header>
			<Modal.Body className={`${Styles.modalBody}`}>{children}</Modal.Body>
		</Modal>
	)
}


export default Registration