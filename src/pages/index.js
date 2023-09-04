import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import SectionHero from '../components/section-hero'
import SectionAlert from '../components/section-alert'
import SectionIntro from '../components/section-intro'
import SectionProfile from '../components/section-profile'
import SectionInfo from '../components/section-info'
import SectionMap from '../components/section-map'
import SectionFAQs from '../components/section-faqs'

const Index = props => {
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
			<Seo title={title} pathname={props.location.pathname} />
			<SectionHero />
			<main>
				<SectionAlert />
				<SectionIntro />
				<SectionProfile />
				<SectionInfo />
				<SectionMap />
				<SectionFAQs />
			</main>
		</Layout>
	)
}

export default Index