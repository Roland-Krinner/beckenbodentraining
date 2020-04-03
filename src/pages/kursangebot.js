import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
// import { useStaticQuery, graphql } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// import { defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
// import Head from '../components/head'
import { SubPage } from '../components/local-components'
import Styles from './kursangebot.module.scss'

export default props => {
	// const data = useStaticQuery(graphql`
	// 	query {
	// 		allContentfulSeiteProfil {
	// 			edges {
	// 				node {
	// 					introText {
	// 						json
	// 					}
	// 					featureBild {
	// 						title
	// 						file {
	// 							url
	// 						}
	// 					}
	// 					profilBild {
	// 						title
	// 						file {
	// 							url
	// 						}
	// 					}
	// 					profilHeadline
	// 					profilSubline
	// 					profilText {
	// 						json
	// 					}
	// 					sektionen {
	// 						text {
	// 							json
	// 						}
	// 					}
	// 					sektionenAnzeigen
	// 				}
	// 			}
	// 		}
	// 	}
	// `)
	// const introTextJSON = data.allContentfulSeiteProfil.edges[0].node.introText.json
	// const featureBild = data.allContentfulSeiteProfil.edges[0].node.featureBild
	// const profilBild = data.allContentfulSeiteProfil.edges[0].node.profilBild
	// const profilHeadline = data.allContentfulSeiteProfil.edges[0].node.profilHeadline
	// const profilSubline = data.allContentfulSeiteProfil.edges[0].node.profilSubline
	// const profilTextJSON = data.allContentfulSeiteProfil.edges[0].node.profilText.json
	// const sektionen = data.allContentfulSeiteProfil.edges[0].node.sektionen
	// const sektionenAnzeigen = data.allContentfulSeiteProfil.edges[0].node.sektionenAnzeigen

	return (
		<Layout pageInfo={{ pageName: 'kursangebot', pageType: 'subPage' }}>
			{/* <Head title="Profil" props={props} /> */}
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<Container>
					<h1 className="mb-0 mb-sm-1">Kursangebot</h1>
					<p className="font-size-lg mb-4 mb-lg-5 text-muted">Hier kommt das Kursangebot rein</p>
				</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm overflow-hidden">
						<Card.Body>
							<Row>
								<Col>
									<h3>Lorem ipsum</h3>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus consectetur temporibus ullam ab quisquam reiciendis in quod dolores quis repellat libero praesentium id quidem pariatur nemo adipisci beatae, numquam commodi maxime voluptatum est dolore. Excepturi officia nihil quas dignissimos tenetur veniam sit laudantium amet quos beatae, cum maiores sapiente recusandae eius vitae pariatur voluptatum rerum ea commodi deleniti, libero aliquam itaque necessitatibus! Cum
										voluptas deserunt impedit unde aliquam odit veniam commodi beatae nulla aspernatur harum sunt, earum, incidunt fugit quam?
									</p>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm overflow-hidden">
						<Card.Body>
							<Row>
								<Col>
									<h3>Lorem ipsum</h3>
									<p>
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus consectetur temporibus ullam ab quisquam reiciendis in quod dolores quis repellat libero praesentium id quidem pariatur nemo adipisci beatae, numquam commodi maxime voluptatum est dolore. Excepturi officia nihil quas dignissimos tenetur veniam sit laudantium amet quos beatae, cum maiores sapiente recusandae eius vitae pariatur voluptatum rerum ea commodi deleniti, libero aliquam itaque necessitatibus! Cum
										voluptas deserunt impedit unde aliquam odit veniam commodi beatae nulla aspernatur harum sunt, earum, incidunt fugit quam?
									</p>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Container>
			</SubPage>
		</Layout>
	)
}
