import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from './format-options'
import Styles from './section-alert.module.scss'

export default () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						hinweis {
							headline
							text {
								json
							}
						}
						hinweisAnzeigen
					}
				}
			}
		}
	`)
	const headline = data.allContentfulSeiteStartseite.edges[0].node.hinweis.headline
	const textJSON = data.allContentfulSeiteStartseite.edges[0].node.hinweis.text.json
	const hinweisAnzeigen = data.allContentfulSeiteStartseite.edges[0].node.hinweisAnzeigen

	return hinweisAnzeigen === true ? (
		<section className={`py-8 normalize-last-p ${Styles.bg}`}>
			<Container>
				<Row>
					<Col>
						<Alert variant="danger" className={`${Styles.alert}`}>
							<h5 className="mb-0">
								<i class="fe fe-alert-triangle mr-2"></i>
								{headline}
							</h5>
						</Alert>
						{documentToReactComponents(textJSON, defaultTextOptions)}
					</Col>
				</Row>
			</Container>
		</section>
	) : (
		''
	)
}
