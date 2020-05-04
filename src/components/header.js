import React from 'react'
import { Link } from 'gatsby'
import { Navbar, Nav } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { SVG } from './local-components'
import Styles from './header.module.scss'

const NavContent = ({ pageInfo }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulDatenMetadaten {
				edges {
					node {
						brandLogo {
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
		}
	`)
	const svg = data.allContentfulDatenMetadaten.edges[0].node.brandLogo.svg
	const alt = data.allContentfulDatenMetadaten.edges[0].node.brandLogo.title
	const file = data.allContentfulDatenMetadaten.edges[0].node.brandLogo.file

	return (
		<>
			{pageInfo.pageType && pageInfo.pageType === 'homePage' ? (
				<div className={Styles.brand}>
					<SVG svg={svg} file={file} alt={alt} />
				</div>
			) : (
				<Link to="/" className={Styles.brand}>
					<SVG svg={svg} file={file} alt={alt} />
				</Link>
			)}
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Navbar.Toggle>
					<i className="fe fe-x"></i>
				</Navbar.Toggle>
				<Nav className="ml-auto" activeKey={pageInfo && pageInfo.pageName}>
					<Nav.Item className={`d-block d-lg-none ${Styles.navItem}`}>
						<Link to="/">
							<Nav.Link as="span" eventKey="startseite" className={Styles.navLink}>
								<span>Startseite</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item className={Styles.navItem}>
						<Link to="/kursangebot">
							<Nav.Link as="span" eventKey="kursangebot" className={Styles.navLink}>
								<span>Kursangebot</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item className={Styles.navItem}>
						<Link to="/bebo-konzept">
							<Nav.Link as="span" eventKey="bebo-konzept" className={Styles.navLink}>
								<span>Das BeBo Konzept</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item className={Styles.navItem}>
						<Link to="/profil">
							<Nav.Link as="span" eventKey="profil" className={Styles.navLink}>
								<span>Profil</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item className={Styles.navItem}>
						<Link to="/kontakt">
							<Nav.Link as="span" eventKey="kontakt" className={Styles.navLink}>
								<span>Kontakt</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</>
	)
}

export default ({ pageInfo }) => {
	return (
		<header>
			{/* <Navbar bg="light" expand="lg" variant="light" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar> */}
			{/* <div>Sandra Läuger - Beckenbodentraining</div> */}
			{/* <Navbar bg="brown-1" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
			<Navbar bg="brown-2" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar> */}
			<Navbar bg="brown-2" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
			{/* <Navbar bg="brown-4" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
			<Navbar bg="brown-5" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
			<Navbar bg="brown-6" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar> */}
		</header>
	)
}
