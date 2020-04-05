import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { mapTextOptions } from './format-options'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import mapboxgl from 'mapbox-gl'

export default () => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						karte {
							accessToken
							zoomLevel
							style
							location {
								lon
								lat
							}
							pin {
								file {
									url
								}
							}
							pinText
						}
						kartenText {
							json
						}
					}
				}
			}
		}
	`)
	const mapAccessToken = data.allContentfulSeiteStartseite.edges[0].node.karte.accessToken
	const mapZoomLevel = data.allContentfulSeiteStartseite.edges[0].node.karte.zoomLevel
	const mapStyle = data.allContentfulSeiteStartseite.edges[0].node.karte.style
	const mapLocation = data.allContentfulSeiteStartseite.edges[0].node.karte.location
	const mapPin = data.allContentfulSeiteStartseite.edges[0].node.karte.pin.file.url
	const mapPinText = data.allContentfulSeiteStartseite.edges[0].node.karte.pinText
	const mapTextJSON = data.allContentfulSeiteStartseite.edges[0].node.kartenText.json

	mapboxgl.accessToken = mapAccessToken

	const mapContainer1 = useRef()
	const mapContainer2 = useRef()

	useEffect(() => {
		if (state.mapVisible) {
			const map1 = new mapboxgl.Map({
				container: mapContainer1.current,
				style: mapStyle,
				center: [mapLocation.lon, mapLocation.lat],
				zoom: mapZoomLevel,
			})
			const map2 = new mapboxgl.Map({
				container: mapContainer2.current,
				style: mapStyle,
				center: [mapLocation.lon, mapLocation.lat],
				zoom: mapZoomLevel,
			})
			map1.on('load', function() {
				map1.loadImage(mapPin, function(error, image) {
					if (error) throw error
					map1.addImage('custom-marker', image)
					map1.addLayer(layerSettings)
				})
			})
			map2.on('load', function() {
				map2.loadImage(mapPin, function(error, image) {
					if (error) throw error
					map2.addImage('custom-marker', image)
					map2.addLayer(layerSettings)
				})
			})
			const layerSettings = {
				id: 'markers',
				type: 'symbol',
				source: {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								properties: {
									description: mapPinText,
								},
								geometry: {
									type: 'Point',
									coordinates: [mapLocation.lon, mapLocation.lat],
								},
							},
						],
					},
				},
				layout: {
					'text-field': ['get', 'description'],
					'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
					'text-radial-offset': 2.0,
					'text-justify': 'auto',
					'icon-image': 'custom-marker',
					'icon-size': 0.5,
				},
			}
		}
	}, [state.mapVisible])

	return (
		<section className="bg-white pt-8 pt-md-0 border-top border-bottom">
			<Container>
				<Row>
					{state.mapVisible ? (
						<Col xs={12} md={6}>
							<div className="embed-responsive embed-responsive-1by1 d-md-none">
								<div ref={mapContainer1} className="embed-responsive-item"></div>
							</div>
							<div className="position-relative h-100 vw-50 float-right d-none d-md-block">
								<div ref={mapContainer2} className="w-100 h-100"></div>
								<div className="shape shape-right shape-fluid-y svg-shim text-white">
									<svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 386V0H100V1544H50V1158L0 386Z" fill="currentColor" />
									</svg>
								</div>
							</div>
						</Col>
					) : (
						<Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
							<a
								href="#!"
								className={`btn btn-success btn-sm`}
								onClick={e => {
									e.preventDefault()
									dispatch({ type: 'TOGGLE_MODAL' })
								}}
							>
								Karte anzeigen
							</a>
						</Col>
					)}
					<Col xs={12} md={6} lg={5} className="offset-lg-1 py-8 py-md-11 py-lg-12 py-xxl-14 normalize-last-p">
						{documentToReactComponents(mapTextJSON, mapTextOptions)}
					</Col>
				</Row>
			</Container>
		</section>
	)
}
