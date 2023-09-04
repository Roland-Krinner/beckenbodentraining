import React, { useEffect, useContext, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cookieBannerTextOptions } from './format-options'
import * as Styles from './cookie-banner.module.scss'

const Banner = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulKomponenteDatenschutzhinweis {
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
	const headline = data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.headline
	const textJSON = JSON.parse(data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.text.raw)
	const buttonText = data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.buttonText

	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	// workaround, because direct binding to global state does not work in production
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		setShowToast(state.cookieBannerVisible)
	}, [state.cookieBannerVisible])

	return (
		<div className={`${Styles.wrapper}`}>
			<Toast
				onClose={() => {
					dispatch({ type: 'HIDE_COOKIEBANNER' })
				}}
				show={showToast}
				animation={false}
				className="no-select"
			>
				<Toast.Header>
					<strong className="mr-auto">{headline}</strong>
				</Toast.Header>
				<Toast.Body>
					{documentToReactComponents(textJSON, cookieBannerTextOptions)}
					<div className={Styles.footer}>
						<button
							className={`btn btn-secondary btn-sm`}
							onClick={() => {
								dispatch({ type: 'HIDE_COOKIEBANNER' })
							}}
						>
							{buttonText}
						</button>
					</div>
				</Toast.Body>
			</Toast>
		</div>
	)
}

export default Banner