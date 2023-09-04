import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from './format-options'
import { Section } from './local-components'
import * as Styles from './section-profile.module.scss'

const imgOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => '',
		[BLOCKS.HEADING_2]: (node, children) => '',
		[BLOCKS.HEADING_3]: (node, children) => '',
		[BLOCKS.HEADING_4]: (node, children) => '',
		[BLOCKS.HEADING_5]: (node, children) => '',
		[BLOCKS.HEADING_6]: (node, children) => '',
		[BLOCKS.PARAGRAPH]: (node, children) => '',
		[BLOCKS.EMBEDDED_ASSET]: (node, children) => {
			console.log(node)
			const title = node.data.target.fields.title['en-US']
			const url = node.data.target.fields.file['en-US'].url
			return <img src={url} alt={title} className={`${Styles.image} rounded-circle`} />
		},
	},
}

const SectionProfile = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						profil {
							raw
							references {
								... on ContentfulAsset {
								  contentful_id
								  title
								  __typename
								  gatsbyImageData(layout: FIXED, width: 640)
								}
							  }  
						}
					}
				}
			}
		}
	`)
	const profil = data.allContentfulSeiteStartseite.edges[0].node.profil
	const profilJSON = JSON.parse(profil.raw)
	console.log(profil)
	const profilBildTitel = profil.references[0].title
	const profilBildUrl = profil.references[0].gatsbyImageData.images.fallback.src

	return (
		<>
			<div className="position-relative mt-n14">
				<div className="shape shape-bottom shape-fluid-x svg-shim text-gray-100">
					<svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
					</svg>
				</div>
			</div>
			<div className="bg-gradient-light pt-14">
				<Section data={{ classes: 'normalize-last-p' }}>
					<Container>
						<Row className="justify-content-center align-items-center">
							<Col xs={6} sm={4} lg={3} className={Styles.profileImgWrapper}>
								{/* {documentToReactComponents(profilJSON, imgOptions)} */}
								<img src={profilBildUrl} alt={profilBildTitel} className={`${Styles.image} rounded-circle`} />
							</Col>
							<Col md={12} lg={9} className="mt-5 mt-lg-0 pl-lg-8 normalize-last-p">
								{documentToReactComponents(profilJSON, defaultTextOptions)}
							</Col>
						</Row>
					</Container>
				</Section>
			</div>
		</>
	)
}

export default SectionProfile