import React, { useRef, useEffect, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import mapboxgl from 'mapbox-gl'

export default props => {
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

	mapboxgl.accessToken = mapAccessToken

	const mapContainer1 = useRef()

	useEffect(() => {
		const map1 = new mapboxgl.Map({
			container: mapContainer1.current,
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
		})
	}, [state.mapVisible, mapLocation.lat, mapLocation.lon, mapPin, mapPinText, mapStyle, mapZoomLevel])

	return <div ref={mapContainer1} className={props.classes}></div>
}
