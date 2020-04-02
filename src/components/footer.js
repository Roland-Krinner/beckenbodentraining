import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { SVG } from './local-components'
import Styles from './footer.module.scss'

const Footer = ({ pageInfo: { pageType } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulMetadaten {
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
			allContentfulKontaktDaten {
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
	const svg = data.allContentfulMetadaten.edges[0].node.brandIcon.svg
	const alt = data.allContentfulMetadaten.edges[0].node.brandIcon.title
	const file = data.allContentfulMetadaten.edges[0].node.brandIcon.file

	const name = data.allContentfulKontaktDaten.edges[0].node.name
	const strasse = data.allContentfulKontaktDaten.edges[0].node.strasse
	const ort = data.allContentfulKontaktDaten.edges[0].node.ort
	const telefon = data.allContentfulKontaktDaten.edges[0].node.telefon
	const eMail = data.allContentfulKontaktDaten.edges[0].node.eMail
	const websiteName = data.allContentfulKontaktDaten.edges[0].node.websiteName
	const websiteUrl = data.allContentfulKontaktDaten.edges[0].node.websiteUrl

	const headline = 'font-weight-bold text-uppercase text-white mt-6'
	const listItem = 'text-white-70'
	const listItemWrapper = 'text-white-70 my-0'

	const homePageClassesFooter = pageType === 'homePage' ? 'mt-n12 mt-md-n15' : ''
	const homePageClassesContainer = pageType === 'homePage' ? 'pt-12 pt-md-14 pt-lg-15' : ''

	return (
		<footer className={`bg-dark position-relative ${homePageClassesFooter}`}>
			<Container className={`py-8 py-md-12 ${homePageClassesContainer}`}>
				<Row noGutters>
					<Col xs={12} md={6} lg={12} xl={3}>
						<div>
							<div className={`${Styles.svgWrapper} mt-6`}>
								<SVG svg={svg} file={file} alt={alt} />
							</div>
							{/* <div className={Styles.svgWrapper}>
								<SVG svg={svg} file={file} alt={alt} />
							</div>
							<div className={`${listItemWrapper}`}>Sandra Läuger</div>
							<div className={`${listItemWrapper}`}>Beckenbodentraining</div> */}
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
								<Link to="/leistungen" className={`${listItem}`}>
									Leistungen
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
							<p className={`${listItemWrapper}`}>
								{name}
								<br />
								{strasse}
								<br />
								{ort}
							</p>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Kontakt</h6>
							<p className={`${listItemWrapper}`}>
								<i className="fe fe-smartphone mr-2"></i>
								{/* <a href={`tel:${phonePlain}`} className={`${listItem}`}>
									{phone}
								</a> */}
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

				{/* <Row className="justify-content-center">
					<Col xs={3} className="mb-10 d-none d-md-block">
						<SVG svg={svg} file={file} alt={alt} />
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6} lg={4} className="d-lg-flex justify-content-center border-right border-white">
						<div>
							<h6 className={headline}>Inhalt</h6>
							<div className={`${listItemWrapper}`}>
								<Link to="/" className={`${listItem}`}>
									Startseite
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/kurse" className={`${listItem}`}>
									Kursangebot
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/touren" className={`${listItem}`}>
									Leistungen
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
					<Col xs={12} md={6} lg={4} className="d-lg-flex justify-content-center border-right border-white">
						<div>
							<h6 className={headline}>Adresse</h6>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} className="d-lg-flex justify-content-center">
						<div>
							<h6 className={headline}>Kontakt</h6>
						</div>
					</Col>
				</Row> */}
			</Container>
			<Container fluid className="py-5 bg-black">
				<Row>
					<Col xs={12} className="d-sm-flex flex-row-reverse">
						<p className="text-white-70 mb-0 text-center text-sm-left">
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
