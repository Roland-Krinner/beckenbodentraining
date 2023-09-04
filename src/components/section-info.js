import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './local-components'
import { featureMutedTextOptions } from './format-options'

const SectionInfo = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						infoText {
							raw
						}
					}
				}
			}
		}
	`)
	const infoTextJSON = JSON.parse(data.allContentfulSeiteStartseite.edges[0].node.infoText.raw)

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

export default SectionInfo