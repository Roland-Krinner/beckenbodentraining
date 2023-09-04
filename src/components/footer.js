import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Svg } from './local-components'
import * as Styles from './footer.module.scss'

const Footer = ({ pageInfo: { pageType } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulDatenMetadaten {
				edges {
					node {
						brandIcon {
							title
							svg {
								content
							}
							file {
								url
								fileName
								contentType
							}
						}
					}
				}
			}
			allContentfulDatenKontaktdaten {
				edges {
					node {
						name
						strasse
						ort
						telefon
						eMail
						websiteName
						websiteUrl
					}
				}
			}
		}
	`)
	const svg = data.allContentfulDatenMetadaten.edges[0].node.brandIcon.svg
	const alt = data.allContentfulDatenMetadaten.edges[0].node.brandIcon.title
	const file = data.allContentfulDatenMetadaten.edges[0].node.brandIcon.file

	const name = data.allContentfulDatenKontaktdaten.edges[0].node.name
	const strasse = data.allContentfulDatenKontaktdaten.edges[0].node.strasse
	const ort = data.allContentfulDatenKontaktdaten.edges[0].node.ort
	const telefon = data.allContentfulDatenKontaktdaten.edges[0].node.telefon
	const eMail = data.allContentfulDatenKontaktdaten.edges[0].node.eMail
	const websiteName = data.allContentfulDatenKontaktdaten.edges[0].node.websiteName
	const websiteUrl = data.allContentfulDatenKontaktdaten.edges[0].node.websiteUrl

	const headline = 'font-weight-bold text-uppercase text-white mt-6 h5'
	const listItem = 'text-white'
	const listItemWrapper = 'text-white my-0'

	const classesFooter = pageType === 'homePage' ? 'mt-n14 mt-md-n15' : 'xxpt-12 xxpt-md-12'
	const classesContainer = pageType === 'homePage' ? 'pt-14 pt-md-15' : 'pt-9 pt-md-12'

	return (
		<footer className={`bg-dark-green position-relative ${classesFooter}`}>
			<Container className={`pb-9 pb-md-12 ${classesContainer}`}>
				<Row>
					<Col xs={12} md={6} lg={12} xl={3}>
						<div>
							<div className={`${Styles.svgWrapper} mt-6`}>
								<Svg svg={svg} file={file} alt={alt} />
							</div>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Inhalt</h6>
							<div className={`${listItemWrapper}`}>
								<Link to="/" className={`${listItem}`}>
									Startseite
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/kursangebot" className={`${listItem}`}>
									Kursangebot
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/bebo-konzept" className={`${listItem}`}>
									Das BeBo® Konzept
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/profil" className={`${listItem}`}>
									Profil
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/kontakt" className={`${listItem}`}>
									Kontakt
								</Link>
							</div>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Adresse</h6>
							<address className="mb-0">
								<p className={`${listItemWrapper}`}>
									{name}
									<br />
									{strasse}
									<br />
									{ort}
								</p>
							</address>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Kontakt</h6>
							<p className={`${listItemWrapper}`}>
								<i className="fe fe-smartphone mr-2"></i>
								<a href={`tel:${telefon}`} className={`${listItem}`}>
									{telefon}
								</a>
								<br />
								<i className="fe fe-mail mr-2"></i>
								<a href={`mailto:${eMail}`} className={`${listItem}`}>
									{eMail}
								</a>
								<br />
								<i className="fe fe-globe mr-2"></i>
								<a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`${listItem}`}>
									{websiteName}
								</a>
							</p>
						</div>
					</Col>
				</Row>
			</Container>
			<Container fluid className="py-5 bg-white xxx__bg-black">
				<Row>
					<Col xs={12} className="d-sm-flex flex-row-reverse">
						<p className="xxx__text-white-70 mb-0 text-center text-sm-left">
							<Link to="/impressum" className="text-reset pr-3">
								Impressum
							</Link>
							<Link to="/datenschutz" className="text-reset ml-3 pr-3">
								Datenschutz
							</Link>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
