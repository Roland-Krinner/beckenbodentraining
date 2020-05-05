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

	const classesHeader = pageInfo.pageType === 'homePage' ? 'mb-n11 mb-xl-n12' : 'bg-gray-200'

	return (
		<header className={`${classesHeader} ${Styles.header}`}>
			<Navbar expand="lg" variant="dark" collapseOnSelect className={Styles.navbar}>
				<NavContent pageInfo={pageInfo} />
			</Navbar>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 400">
				<defs>
					<linearGradient id="gradient" gradientTransform="rotate(55)">
						<stop stopColor="#dc3545" offset="0%"></stop>
						<stop stopColor="#fd7e14" offset="35%"></stop>
						<stop stopColor="#fad961" offset="100%"></stop>
					</linearGradient>
				</defs>
				<mask id="mask">
					<rect width="1920" height="400" fill="white"></rect>
					<path d="M1920 4.719v69.5c-362.63 60.036-692.797 55.536-990.5-13.5C565.833-23.615 256 12.813 0 170L1 4.719h1919z" fill="black" transform="translate(0,230), rotate(180 960.5 87.36)"></path>
				</mask>
				<g fill="#fff" mask="url(#mask)">
					<rect width="1920" height="400" fill="url(#gradient)"></rect>
					<path d="M1 170V99c269.033-70.44 603.533-66.44 1003.5 12C1494 207 1921 4.719 1921 4.719L1920 170H1z" fillOpacity=".3" fill="#FFF" transform="translate(0, 230)"></path>
					<path d="M1 170.75V99C373.115 4.216 705.281-4.951 997.5 71.5c365.667 95.667 673.5 73.406 923.5-66.781l-1 166.031H1z" fillOpacity=".3" fill="#FFF" transform="translate(0, 230)"></path>
					<path d="M1 170v-67C400.333-1.333 744.167-19 1032.5 50c432.5 103.5 754 19.219 888.5-45.281l-1 166.031L1 170z" fillOpacity=".35" fill="#FFF" transform="translate(0, 230)"></path>
				</g>
			</svg>
			{/* <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 570">
				<defs>
					<linearGradient id="gradient" gradientTransform="rotate(55)">
						<stop stopColor="#dc3545" offset="0%"></stop>
						<stop stopColor="#fd7e14" offset="35%"></stop>
						<stop stopColor="#fad961" offset="100%"></stop>
					</linearGradient>
				</defs>
				<mask id="mask">
					<rect width="1920" height="600" fill="white"></rect>
					<path d="M1920 4.719v69.5c-362.63 60.036-692.797 55.536-990.5-13.5C565.833-23.615 256 12.813 0 170L1 4.719h1919z" fill="black" transform="translate(0,400), rotate(180 960.5 87.36)"></path>
				</mask>
				<g fill="#fff" mask="url(#mask)">
					<rect width="1920" height="600" fill="url(#gradient)"></rect>
					<path d="M1 170V99c269.033-70.44 603.533-66.44 1003.5 12C1494 207 1921 4.719 1921 4.719L1920 170H1z" fillOpacity=".3" fill="#FFF" transform="translate(0, 400)"></path>
					<path d="M1 170.75V99C373.115 4.216 705.281-4.951 997.5 71.5c365.667 95.667 673.5 73.406 923.5-66.781l-1 166.031H1z" fillOpacity=".3" fill="#FFF" transform="translate(0, 400)"></path>
					<path d="M1 170v-67C400.333-1.333 744.167-19 1032.5 50c432.5 103.5 754 19.219 888.5-45.281l-1 166.031L1 170z" fillOpacity=".35" fill="#FFF" transform="translate(0, 400)"></path>
				</g>
			</svg> */}
		</header>
	)
}
