import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { SVG } from './local-components'
import Styles from './footer.module.scss'

export default ({ pageInfo: { pageType } }) => {
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
	const listItem = 'xxx__text-white-70 text-white'
	const listItemWrapper = 'xxx__text-white-70 text-white my-0'

	const classesFooter = pageType === 'homePage' ? 'mt-n14 mt-md-n15' : 'xxpt-12 xxpt-md-12'
	const classesContainer = pageType === 'homePage' ? 'pt-14 pt-md-15' : 'pt-9 pt-md-12'
	// const svgFill = pageType === 'homePage' ? '#ffffff' : '#f1f4f8'

	return (
		<footer className={`bg-dark-green position-relative ${classesFooter} ${Styles.footer}`}>
			{/* <div className={Styles.waveWrapper}>
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 280" className={Styles.waveSvg}>
					<g fill={svgFill}>
						<path d="M1920 0v19.387c-211.21 136.245-517.564 173.305-919.061 111.18C679.068 80.763 345.422 103.907 0 200L-2 0h1922z"></path>
						<path d="M1920 0v4c-252.04 171.948-554.875 231.087-908.506 177.417C361.105 82.709-2.15 200 .254 200 1.858 200 1.106 133.333-2 0h1922z" fillOpacity=".35"></path>
						<path d="M1920 0v29.724c-230.661 164.917-529.816 221.768-897.464 170.553C568.815 137.072 198.92 150.114 0 269V0h1920z" fillOpacity=".17"></path>
						<path d="M1920 0v29.724c-223.98 145.48-526.685 188.553-908.112 129.22C630.46 99.61 293.3 122.961.407 229V0H1920z" fillOpacity=".45"></path>
					</g>
				</svg>
			</div> */}
			<Container className={`pb-9 pb-md-12 ${classesContainer}`}>
				<Row noGutters>
					<Col xs={12} md={6} lg={12} xl={3}>
						<div>
							<div className={`${Styles.svgWrapper} mt-6`}>
								<SVG svg={svg} file={file} alt={alt} />
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
									Das BeBo Konzept
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
