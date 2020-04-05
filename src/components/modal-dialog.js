import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import { ToggleMapCheckbox } from './local-components'
// import Styles from './modal-dialog.module.scss'

export default () => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	return (
		<Modal show={state.modalVisible} size="lg" aria-labelledby="vertical-modal-title" centered>
			<Modal.Header closeButton={false}>
				<Modal.Title id="vertical-modal-title">Datenschutzeinstellungen</Modal.Title>
				<button
					type="button"
					className="close"
					onClick={e => {
						e.preventDefault()
						dispatch({ type: 'TOGGLE_MODAL' })
					}}
				>
					<span aria-hidden="true">×</span>
					<span className="sr-only">Close</span>
				</button>
			</Modal.Header>
			<Modal.Body>
				<h4>Einstellungen bearbeiten</h4>
				<ToggleMapCheckbox />
			</Modal.Body>
			<Modal.Footer className="flex-column flex-lg-row">
				<Button
					variant="secondary"
					className="btn-default btn-md-down-block ml-0 ml-lg-1 mt-2 mt-lg-0"
					onClick={e => {
						e.preventDefault()
						dispatch({ type: 'TOGGLE_MODAL' })
					}}
				>
					Fenster schließen
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
