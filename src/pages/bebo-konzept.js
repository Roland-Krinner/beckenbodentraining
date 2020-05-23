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
						logo {
							fluid(maxWidth: 640, quality: 80) {
								src
							}
							title
						}
						logoText
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteBeBoKonzept.edges[0].node.title
	const introTextJSON = data.allContentfulSeiteBeBoKonzept.edges[0].node.introText.json
	const textJSON = data.allContentfulSeiteBeBoKonzept.edges[0].node.text.json
	const logo = data.allContentfulSeiteBeBoKonzept.edges[0].node.logo.fluid.src
	const logoTitle = data.allContentfulSeiteBeBoKonzept.edges[0].node.logo.title
	const logoText = data.allContentfulSeiteBeBoKonzept.edges[0].node.logoText

	return (
		<Layout pageInfo={{ pageName: 'bebo-konzept', pageType: 'subPage' }}>
			<SEO title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.xx__mobileContainer}>
					<Row>
						<Col xs="12" lg="9">
							<Card className="shadow-dark-sm">
								<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(textJSON, profileSectionTextOptions)}</Card.Body>
							</Card>
						</Col>
						<Col xs="12" lg="3" className="mt-4 mt-lg-0">
							<Card className="shadow-dark-sm">
								<Card.Body className={`${Styles.cardBody} ${Styles.logoBox}`}>
									<img src={logo} alt={logoTitle} class={Styles.image} />
									<hr />
									<p class="h6 text-gray-700 mb-0">{logoText}</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}
