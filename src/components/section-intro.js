import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { mutedTextOptions, infoBoxTextOptions, buttonTextOptions } from './format-options'

export default () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						intro {
							json
						}
						infoBox1 {
							json
						}
						buttonInfoBox1 {
							json
						}
						infoBox2 {
							json
						}
						buttonInfoBox2 {
							json
						}
					}
				}
			}
		}
	`)
	const introJSON = data.allContentfulSeiteStartseite.edges[0].node.intro.json
	const infoBox1JSON = data.allContentfulSeiteStartseite.edges[0].node.infoBox1.json
	const buttonInfoBox1JSON = data.allContentfulSeiteStartseite.edges[0].node.buttonInfoBox1.json
	const infoBox2JSON = data.allContentfulSeiteStartseite.edges[0].node.infoBox2.json
	const buttonInfoBox2JSON = data.allContentfulSeiteStartseite.edges[0].node.buttonInfoBox2.json

	return (
		<section className="pt-8 pt-md-12 normalize-last-p bg-gray-200">
			<Container>
				<Row>
					<Col xs={12}>{documentToReactComponents(introJSON, mutedTextOptions)}</Col>
				</Row>
				<Row className="align-items-center no-gutters mt-7 mt-md-10">
					<Col xs={12} md={6}>
						<Card className="rounded-lg shadow-lg mb-6 mb-md-0 card-border border-success" style={{ zIndex: 1 }}>
							<Card.Body className="py-6 py-md-8">
								<Row className="justify-content-center">
									<Col xs={12} className="col-xl-9 py-md-2 py-lg-5">
										<address className="mb-0">{documentToReactComponents(infoBox1JSON, infoBoxTextOptions)}</address>
										{documentToReactComponents(buttonInfoBox1JSON, buttonTextOptions)}
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} md={6} className="ml-md-n3">
						<Card className="rounded-lg shadow-lg mb-6 mb-md-0 card-border border-success">
							<Card.Body className="py-6 py-md-8">
								<Row className="justify-content-center">
									<Col xs={12} className="col-xl-9">
										{documentToReactComponents(infoBox2JSON, infoBoxTextOptions)}
										{documentToReactComponents(buttonInfoBox2JSON, buttonTextOptions)}
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}
