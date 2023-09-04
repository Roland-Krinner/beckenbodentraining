import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import { ToggleMapCheckbox } from './local-components'
import * as Styles from './modal-dialog.module.scss'

const BrandData = ({ data: { searchStr, customClasses } }) => {
	if (searchStr === '$$KartenEinstellungen$$') {
		return <ToggleMapCheckbox />
	}
	return ''
}

const Dialog = () => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	const data = useStaticQuery(graphql`
		query {
			allContentfulKomponenteKartenEinstellungen {
				edges {
					node {
						headline
						text {
							raw
						}
						buttonText
					}
				}
			}
		}
	`)
	const headline = data.allContentfulKomponenteKartenEinstellungen.edges[0].node.headline
	const textJSON = JSON.parse(data.allContentfulKomponenteKartenEinstellungen.edges[0].node.text.raw)
	const buttonText = data.allContentfulKomponenteKartenEinstellungen.edges[0].node.buttonText

	const modalTextOptions = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => {
				if (node.content.length === 1 && node.content[0].value === '') {
					return ''
				} else if (node.content[0].value.indexOf('$$') !== -1) {
					return <BrandData data={{ searchStr: node.content[0].value, customClasses: '' }} />
				} else {
					return <p className="">{children}</p>
				}
			},
			[INLINES.HYPERLINK]: (node, children) => {
				if (node.data.uri && node.data.uri.startsWith('/')) {
					return (
						<Link
							to={node.data.uri}
							onClick={() => {
								dispatch({ type: 'TOGGLE_MODAL' })
							}}
							className={`text-success text-decoration-none`}
						>
							{children}
						</Link>
					)
				} else {
					return (
						<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
							{children}
						</a>
					)
				}
			},
		},
	}

	return (
		<Modal show={state.modalVisible} size="lg" aria-labelledby="vertical-modal-title" centered className={Styles.modal}>
			<Modal.Header closeButton={false}>
				<Modal.Title id="vertical-modal-title">{headline}</Modal.Title>
				<button
					type="button"
					className="close"
					onClick={e => {
						e.preventDefault()
						dispatch({ type: 'TOGGLE_MODAL' })
					}}
				>
					<span aria-hidden="true">×</span>
					<span className="sr-only">{buttonText}</span>
				</button>
			</Modal.Header>
			<Modal.Body className={Styles.body}>{documentToReactComponents(textJSON, modalTextOptions)}</Modal.Body>
			<Modal.Footer className={`flex-column flex-lg-row ${Styles.footer}`}>
				<Button
					variant="secondary"
					className="btn-sm"
					onClick={e => {
						e.preventDefault()
						dispatch({ type: 'TOGGLE_MODAL' })
					}}
				>
					{buttonText}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}


export default Dialog