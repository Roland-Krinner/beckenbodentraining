import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Layout from '../components/layout'
// import Head from '../components/head'
import { SubPage } from '../components/local-components'
import ContactForm from '../components/contact-form'
import { defaultTextOptions, formTextOptions } from '../components/format-options'
import Styles from './kontakt.module.scss'

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteKontakt {
				edges {
					node {
						introText {
							json
						}
						formularText {
							json
						}
					}
				}
			}
		}
	`)
	const introTextJSON = data.allContentfulSeiteKontakt.edges[0].node.introText.json
	const formularTextJSON = data.allContentfulSeiteKontakt.edges[0].node.formularText.json

	return (
		<Layout pageInfo={{ pageName: 'kontakt', pageType: 'subPage' }}>
			{/* <Head title="Kontakt" props={props} /> */}
			<SubPage data={{ classes: 'bg-gray-200 kontakt-page' }}>
				<Container>
					<Row>
						<Col xs={12} lg={6}>
							{documentToReactComponents(introTextJSON, defaultTextOptions)}
						</Col>
						<Col xs={12} lg={6} className={`mt-5 mt-lg-0 ${Styles.formCardCol}`}>
							<Card className="shadow-dark-sm overflow-hidden">
								<Card.Body className={`${Styles.cardBody}`}>
									<div className={`mt-md-5 ${Styles.cardBodyDiv}`}>{documentToReactComponents(formularTextJSON, formTextOptions)}</div>
									<ContactForm data={{ prefilledText: '', lgCol: '12' }} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}
