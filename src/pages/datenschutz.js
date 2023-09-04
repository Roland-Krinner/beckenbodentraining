import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, legalTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { SubPage } from '../components/local-components'
import * as Styles from './datenschutz.module.scss'

const Datenschutz = props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteDatenschutz {
				edges {
					node {
						title
						introText {
							raw
						}
						contentText {
							raw
						}
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteDatenschutz.edges[0].node.title
	const introTextJSON = JSON.parse(data.allContentfulSeiteDatenschutz.edges[0].node.introText.raw)
	const contentTextJSON = JSON.parse(data.allContentfulSeiteDatenschutz.edges[0].node.contentText.raw)

	return (
		<Layout pageInfo={{ pageName: 'datenschutz', pageType: 'subPage' }}>
			<Seo title={title} pathname={props.location.pathname} />
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

export default Datenschutz