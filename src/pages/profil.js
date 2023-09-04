import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, profileSectionTextOptions, profileHeadlineTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { SubPage } from '../components/local-components'
import * as Styles from './profil.module.scss'

const Image = ({ data: { img, classes } }) => {
	const alt = img.title ? img.title : ''
	const src = img.file && img.file.url ? img.file.url : ''
	return <img src={src} alt={alt} className={classes || ''} />
}

const CardSection = ({ data: { section, sektionenAnzeigen } }) => {
	return sektionenAnzeigen === true ? (
		<Card className="shadow-dark-sm mt-20 mt-sm-7">
			<Row>
				<Col xs={12}>
					<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(JSON.parse(section.text.raw), profileSectionTextOptions)}</Card.Body>
				</Col>
			</Row>
		</Card>
	) : (
		''
	)
}

const Profil = props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteProfil {
				edges {
					node {
						title
						introText {
							raw
						}
						featureBild {
							title
							file {
								url
							}
						}
						profilBild {
							title
							file {
								url
							}
						}
						profilHeadline {
							raw
						}
						profilText {
							raw
						}
						sektionen {
							text {
								raw
							}
						}
						sektionenAnzeigen
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteProfil.edges[0].node.title
	const introTextJSON = JSON.parse(data.allContentfulSeiteProfil.edges[0].node.introText.raw)
	const featureBild = data.allContentfulSeiteProfil.edges[0].node.featureBild
	const profilBild = data.allContentfulSeiteProfil.edges[0].node.profilBild
	const profilHeadlineJSON = JSON.parse(data.allContentfulSeiteProfil.edges[0].node.profilHeadline.raw)
	const profilTextJSON = JSON.parse(data.allContentfulSeiteProfil.edges[0].node.profilText.raw)
	const sektionen = data.allContentfulSeiteProfil.edges[0].node.sektionen
	const sektionenAnzeigen = data.allContentfulSeiteProfil.edges[0].node.sektionenAnzeigen

	return (
		<Layout pageInfo={{ pageName: 'profil', pageType: 'subPage' }}>
			<Seo title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm overflow-hidden">
						<Row>
							<Col xs={4} className="d-none d-md-flex">
								<div style={{ backgroundImage: `url(${featureBild.file.url})` }} className={Styles.bgImgWrapper}></div>
							</Col>
							<Col xs={12} md={8}>
								<Card.Body className={`${Styles.cardBody} ${Styles.minHeight}`}>
									<Row className="justify-content-center mt-4">
										<Col xs={4} sm={3} lg={3} className={Styles.profileImgWrapper}>
											<Image data={{ img: profilBild, classes: `${Styles.image} rounded-circle` }} />
										</Col>
										<Col xs={12} className="text-center">
											{documentToReactComponents(profilHeadlineJSON, profileHeadlineTextOptions)}
											{/* <h3 className="font-weight-bold mt-3 mb-0">{profilHeadline}</h3>
											<p className="text-muted">{profilSubline}</p> */}
										</Col>
									</Row>
									<Row className="mt-6">
										<Col>{documentToReactComponents(profilTextJSON, defaultTextOptions)}</Col>
									</Row>
								</Card.Body>
							</Col>
						</Row>
					</Card>
					{sektionen.map((section, idx) => {
						return <CardSection data={{ section, sektionenAnzeigen }} key={idx} />
					})}
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Profil
