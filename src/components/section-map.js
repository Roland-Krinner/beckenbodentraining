import React, { useContext, useState, useEffect } from 'react'
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

const SectionMap = () => {
	const state = useContext(GlobalStateContext)
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						kartenText {
							raw
						}
					}
				}
			}
		}
	`)

	const mapTextJSON = JSON.parse(data.allContentfulSeiteStartseite.edges[0].node.kartenText.raw)

	// workaround, because direct binding to global state does not work in production
	const [mapVisible, setMapVisible] = useState(true)

	useEffect(() => {
		setMapVisible(state.mapVisible)
	}, [state.mapVisible])

	return (
		<section className="bg-white pt-8 pt-md-0 border-top border-bottom">
			<Container>
				<Row>
					<Col xs={12} md={6}>
						<div className={mapVisible ? 'embed-responsive embed-responsive-1by1 d-md-none' : 'd-md-none'}>{mapVisible ? <Map classes="embed-responsive-item" /> : <ShowModalCta />}</div>
						<div className="position-relative h-100 vw-50 float-right d-none d-md-block">
							<div className={mapVisible ? 'w-100 h-100' : 'w-100 h-100 bg-gray-300 d-flex justify-content-center align-items-center'}>{mapVisible ? <Map classes="w-100 h-100" /> : <ShowModalCta />}</div>
							<div className="shape shape-right shape-fluid-y svg-shim text-white">
								<svg viewBox="0 0 200 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 386V0H200 V1544 H100V1158L0 386Z" fill="currentColor" />
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

export default SectionMap
