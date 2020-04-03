import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { useStaticQuery, graphql } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './local-components'
// import { faqTextOptions } from './format-options'

export default () => {
	// const data = useStaticQuery(graphql`
	// 	query {
	// 		allContentfulSeiteStartseite {
	// 			edges {
	// 				node {
	// 					infoText {
	// 						json
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// `)
	// const infoTextJSON = data.allContentfulSeiteStartseite.edges[0].node.infoText.json

	return (
		<Section data={{ classes: 'bg-white border-bottom' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">
						<h3>Hier kommt die Map rein</h3>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam obcaecati ratione laboriosam harum rem labore, similique doloribus veniam perspiciatis nesciunt dicta cum aut architecto minima aliquam delectus praesentium laudantium excepturi! Numquam adipisci illum accusantium, laborum odio possimus voluptates veritatis iste.</p>
					</Col>
				</Row>
			</Container>
		</Section>
	)
}
