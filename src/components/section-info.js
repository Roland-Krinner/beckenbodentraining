import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './local-components'
import { featureMutedTextOptions } from './format-options'

export default () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						infoText {
							json
						}
					}
				}
			}
		}
	`)
	const infoTextJSON = data.allContentfulSeiteStartseite.edges[0].node.infoText.json

	return (
		<Section data={{ classes: 'bg-gray-200 normalize-last-p' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">{documentToReactComponents(infoTextJSON, featureMutedTextOptions)}</Col>
				</Row>
			</Container>
		</Section>
	)
}
