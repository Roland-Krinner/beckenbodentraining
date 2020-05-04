import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionProfile from '../components/section-profile'
import SectionInfo from '../components/section-info'
import SectionMap from '../components/section-map'
import SectionFAQs from '../components/section-faqs'

export default props => {
	const data = useStaticQuery(
		graphql`
			query {
				allContentfulSeiteStartseite {
					edges {
						node {
							title
						}
					}
				}
			}
		`
	)

	const title = data.allContentfulSeiteStartseite.edges[0].node.title

	return (
		<Layout pageInfo={{ pageName: 'startseite', pageType: 'homePage' }}>
			<SEO title={title} pathname={props.location.pathname} />
			<SectionHero />
			<main>
				<SectionIntro />
				<SectionProfile />
				<SectionInfo />
				<SectionMap />
				<SectionFAQs />
			</main>
		</Layout>
	)
}
