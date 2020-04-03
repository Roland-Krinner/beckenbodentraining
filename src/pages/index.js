import React from 'react'
import Layout from '../components/layout'
// import Head from '../components/head'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionProfile from '../components/section-profile'
import SectionInfo from '../components/section-info'
import SectionMap from '../components/section-map'
import SectionFAQs from '../components/section-faqs'

export default props => {
	return (
		<Layout pageInfo={{ pageName: 'startseite', pageType: 'homePage' }}>
			{/* <Head title="" props={props} /> */}
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
