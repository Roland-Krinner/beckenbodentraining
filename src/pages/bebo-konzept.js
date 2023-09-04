import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, profileSectionTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { SubPage } from '../components/local-components'
import * as Styles from './bebo-konzept.module.scss'

const Konzept = props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteBeBoKonzept {
				edges {
					node {
						title
						introText {
							raw
						}
						text {
							raw
						}
						logo {
							file {
								url
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
	const introTextJSON = JSON.parse(data.allContentfulSeiteBeBoKonzept.edges[0].node.introText.raw)
	const textJSON = JSON.parse(data.allContentfulSeiteBeBoKonzept.edges[0].node.text.raw)
	const logo = data.allContentfulSeiteBeBoKonzept.edges[0].node.logo.file.url
	const logoTitle = data.allContentfulSeiteBeBoKonzept.edges[0].node.logo.title
	const logoText = data.allContentfulSeiteBeBoKonzept.edges[0].node.logoText

	console.log()

	return (
		<Layout pageInfo={{ pageName: 'bebo-konzept', pageType: 'subPage' }}>
			<Seo title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container>
					<Row>
						<Col xs="12" lg="9">
							<Card className="shadow-dark-sm">
								<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(textJSON, profileSectionTextOptions)}</Card.Body>
							</Card>
						</Col>
						<Col xs="12" lg="3" className="mt-4 mt-lg-0">
							<Card className="shadow-dark-sm">
								<Card.Body className={`${Styles.cardBody} ${Styles.logoBox}`}>
									<img src={logo} alt={logoTitle} className={Styles.image} />
									<hr />
									<p className="h6 text-gray-700 mb-0">{logoText}</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Konzept