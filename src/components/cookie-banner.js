import React, { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cookieBannerTextOptions } from './format-options'
import Styles from './cookie-banner.module.scss'

export default () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulKomponenteDatenschutzhinweis {
				edges {
					node {
						headline
						text {
							json
						}
						buttonText
					}
				}
			}
		}
	`)
	const headline = data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.headline
	const textJSON = data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.text.json
	const buttonText = data.allContentfulKomponenteDatenschutzhinweis.edges[0].node.buttonText

	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	return (
		<div className={`${Styles.wrapper}`}>
			<Toast
				onClose={() => {
					dispatch({ type: 'HIDE_COOKIEBANNER' })
				}}
				show={state.cookieBannerVisible}
				animation={false}
				className="no-select"
			>
				<Toast.Header>
					<strong className="mr-auto">{headline}</strong>
				</Toast.Header>
				<Toast.Body>
					{documentToReactComponents(textJSON, cookieBannerTextOptions)}
					<div className={Styles.footer}>
						<a
							href="#!"
							className={`btn btn-secondary btn-sm`}
							onClick={e => {
								e.preventDefault()
								dispatch({ type: 'HIDE_COOKIEBANNER' })
							}}
						>
							{buttonText}
						</a>
					</div>
				</Toast.Body>
			</Toast>
		</div>
	)
}
