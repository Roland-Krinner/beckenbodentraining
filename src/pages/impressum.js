import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, legalTextOptions } from '../components/format-options'
import Layout from '../components/layout'
// import Head from '../components/head'
import { SubPage } from '../components/local-components'
import Styles from './impressum.module.scss'

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteImpressum {
				edges {
					node {
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
	const introTextJSON = data.allContentfulSeiteImpressum.edges[0].node.introText.json
	const contentTextJSON = data.allContentfulSeiteImpressum.edges[0].node.contentText.json

	return (
		<Layout pageInfo={{ pageName: 'impressum', pageType: 'subPage' }}>
			{/* <Head title="Impressum" props={props}/> */}
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container>
					<Card className="shadow-dark-sm mt-20 mt-sm-7">
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
