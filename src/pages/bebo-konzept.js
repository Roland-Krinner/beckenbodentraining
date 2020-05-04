import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, profileSectionTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { SubPage } from '../components/local-components'
import Styles from './bebo-konzept.module.scss'

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteBeBoKonzept {
				edges {
					node {
						title
						introText {
							json
						}
						text {
							json
						}
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteBeBoKonzept.edges[0].node.title
	const introTextJSON = data.allContentfulSeiteBeBoKonzept.edges[0].node.introText.json
	const textJSON = data.allContentfulSeiteBeBoKonzept.edges[0].node.text.json

	return (
		<Layout pageInfo={{ pageName: 'bebo-konzept', pageType: 'subPage' }}>
			<SEO title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm">
						<Row>
							<Col xs={12}>
								<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(textJSON, profileSectionTextOptions)}</Card.Body>
							</Col>
						</Row>
					</Card>
				</Container>
			</SubPage>
		</Layout>
	)
}
