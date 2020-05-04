import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, legalTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { SubPage } from '../components/local-components'
import Styles from './datenschutz.module.scss'

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteDatenschutz {
				edges {
					node {
						title
						introText {
							json
						}
						contentText {
							json
						}
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteDatenschutz.edges[0].node.title
	const introTextJSON = data.allContentfulSeiteDatenschutz.edges[0].node.introText.json
	const contentTextJSON = data.allContentfulSeiteDatenschutz.edges[0].node.contentText.json

	return (
		<Layout pageInfo={{ pageName: 'datenschutz', pageType: 'subPage' }}>
			<SEO title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm mt-4 mt-lg-5">
						<Row>
							<Col xs={12}>
								<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(contentTextJSON, legalTextOptions)}</Card.Body>
							</Col>
						</Row>
					</Card>
				</Container>
			</SubPage>
		</Layout>
	)
}
