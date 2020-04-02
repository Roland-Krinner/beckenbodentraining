import React from 'react'
import { Link } from 'gatsby'
import { Navbar, Nav } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { SVG } from './local-components'
import Styles from './header.module.scss'

const NavContent = ({ pageInfo }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulMetadaten {
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
	const svg = data.allContentfulMetadaten.edges[0].node.brandLogo.svg
	const alt = data.allContentfulMetadaten.edges[0].node.brandLogo.title
	const file = data.allContentfulMetadaten.edges[0].node.brandLogo.file
	return (
		<>
			<Link to="/" className={Styles.brand}>
				<SVG svg={svg} file={file} alt={alt} />
			</Link>
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
						<Link to="/kurse">
							<Nav.Link as="span" eventKey="kurse" className={Styles.navLink}>
								<span>Kursangebot</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item className={Styles.navItem}>
						<Link to="/touren">
							<Nav.Link as="span" eventKey="touren" className={Styles.navLink}>
								<span>Leistungen</span>
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

const Header = ({ pageInfo }) => {
	return (
		<header>
			<Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
		</header>
	)
}

export default Header
