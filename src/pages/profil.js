import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions, profileSectionTextOptions } from '../components/format-options'
import Layout from '../components/layout'
// import Head from '../components/head'
import { SubPage } from '../components/local-components'
import Styles from './profil.module.scss'

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
					<Card.Body className={`${Styles.cardBody}`}>{documentToReactComponents(section.text.json, profileSectionTextOptions)}</Card.Body>
				</Col>
			</Row>
		</Card>
	) : (
		''
	)
}

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteProfil {
				edges {
					node {
						introText {
							json
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
						profilHeadline
						profilSubline
						profilText {
							json
						}
						sektionen {
							text {
								json
							}
						}
						sektionenAnzeigen
					}
				}
			}
		}
	`)
	const introTextJSON = data.allContentfulSeiteProfil.edges[0].node.introText.json
	const featureBild = data.allContentfulSeiteProfil.edges[0].node.featureBild
	const profilBild = data.allContentfulSeiteProfil.edges[0].node.profilBild
	const profilHeadline = data.allContentfulSeiteProfil.edges[0].node.profilHeadline
	const profilSubline = data.allContentfulSeiteProfil.edges[0].node.profilSubline
	const profilTextJSON = data.allContentfulSeiteProfil.edges[0].node.profilText.json
	const sektionen = data.allContentfulSeiteProfil.edges[0].node.sektionen
	const sektionenAnzeigen = data.allContentfulSeiteProfil.edges[0].node.sektionenAnzeigen

	return (
		<Layout pageInfo={{ pageName: 'profil', pageType: 'subPage' }}>
			{/* <Head title="Profil" props={props} /> */}
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm overflow-hidden">
						<Row noGutters>
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
											<h3 className="font-weight-bold mt-3 mb-0">{profilHeadline}</h3>
											<p className="text-muted">{profilSubline}</p>
										</Col>
									</Row>
									<Row noGutters className="mt-4">
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
