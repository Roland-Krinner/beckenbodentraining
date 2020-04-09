import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { mapTextOptions } from './format-options'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import Map from './map'

const ShowModalCta = () => {
	const dispatch = useContext(GlobalDispatchContext)
	return (
		<a
			href="#!"
			className={`btn btn-secondary btn-sm`}
			onClick={e => {
				e.preventDefault()
				dispatch({ type: 'TOGGLE_MODAL' })
			}}
		>
			Karte anzeigen
		</a>
	)
}

export default () => {
	const state = useContext(GlobalStateContext)
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						kartenText {
							json
						}
					}
				}
			}
		}
	`)

	const mapTextJSON = data.allContentfulSeiteStartseite.edges[0].node.kartenText.json

	return (
		<section className="bg-white pt-8 pt-md-0 border-top border-bottom">
			<Container>
				<Row>
					<Col xs={12} md={6}>
						{state.mapVisible ? (
							<div className="embed-responsive embed-responsive-1by1 d-md-none">
								<Map classes="embed-responsive-item" />
							</div>
						) : (
							<div className="d-md-none">
								<ShowModalCta />
							</div>
						)}
						<div className="position-relative h-100 vw-50 float-right d-none d-md-block">
							{state.mapVisible ? (
								<Map classes="w-100 h-100" />
							) : (
								<div className="w-100 h-100 bg-gray-300 d-flex justify-content-center align-items-center">
									<ShowModalCta />
								</div>
							)}
							<div className="shape shape-right shape-fluid-y svg-shim text-white">
								<svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 386V0H100V1544H50V1158L0 386Z" fill="currentColor" />
								</svg>
							</div>
						</div>
					</Col>
					<Col xs={12} md={6} lg={5} className="offset-lg-1 py-8 py-md-11 py-lg-12 py-xxl-14 normalize-last-p">
						{documentToReactComponents(mapTextJSON, mapTextOptions)}
					</Col>
				</Row>
			</Container>
		</section>
	)
}
