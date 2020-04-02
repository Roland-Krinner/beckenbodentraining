import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { heroTextOptions } from './format-options'
import Flickity from './flickity'

const Hero = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulStartseite {
				edges {
					node {
						hero {
							text {
								json
							}
							bilder {
								title
								file {
									url
								}
								fluid(maxWidth: 1600, quality: 75) {
									sizes
									srcSet
								}
							}
						}
					}
				}
			}
		}
	`)
	const heroTextJSON = data.allContentfulStartseite.edges[0].node.hero.text.json
	const heroSlides = data.allContentfulStartseite.edges[0].node.hero.bilder

	const MobileImages = () => {
		return heroSlides.map((slide, idx) => {
			const defaultImage = slide.file.url
			const srcSet = slide.fluid.srcSet
			const sizes = slide.fluid.sizes
			const alt = slide.title
			return (
				<div className="w-100" key={idx}>
					<img data-flickity-lazyload-srcset={srcSet} data-flickity-lazyload-src={`${defaultImage}?w=800`} sizes={sizes} alt={alt} />
				</div>
			)
		})
	}

	const DesktopImages = () => {
		return heroSlides.map((slide, idx) => {
			const defaultImage = slide.file.url
			return <div key={idx} className="w-100 h-100 bg-cover" data-flickity-bg-lazyload={`${defaultImage}?w=1600`}></div>
		})
	}

	return (
		<section className="border-bottom">
			<Container>
				<Row className="align-items-stretch two-col-header">
					<Col xs={12} md={6} className="offset-md-1 order-md-2 two-col-header-item">
						<Flickity className="d-md-none img-cover" options={{ lazyLoad: 1, imagesLoaded: true, wrapAround: false, prevNextButtons: false, pageDots: false, draggable: true }}>
							<MobileImages />
						</Flickity>
						<div className="position-relative h-100 vw-50 d-none d-md-block">
							<Flickity className="flickity-button-bottom flickity-button-white h-100 w-100" options={{ bgLazyLoad: 1, imagesLoaded: true, setGallerySize: false, wrapAround: true, pageDots: false, draggable: true }}>
								<DesktopImages />
							</Flickity>
							<div className="shape shape-left shape-fluid-y svg-shim text-white">
								<svg viewBox="0 0 100 1544" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0 0H100V386L50 1158V1544H0V0Z" fill="currentColor" />
								</svg>
							</div>
						</div>
					</Col>
					<Col xs={12} md={5} className="py-7 py-md-14 py-xxl-0 order-md-1 two-col-header-item two-col-header-item--text">
						{documentToReactComponents(heroTextJSON, heroTextOptions)}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Hero
