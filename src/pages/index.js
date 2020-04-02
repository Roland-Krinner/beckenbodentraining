import React from 'react'
import Layout from '../components/layout'
// import Head from '../components/head'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionProfile from '../components/section-profile'
import SectionCourses from '../components/section-courses'
// import SectionTours from '../components/section-tours'
// import SectionQuotes from '../components/section-quotes'
import SectionFAQs from '../components/section-faqs'

const IndexPage = props => {
	return (
		<Layout pageInfo={{ pageName: 'startseite', pageType: 'homePage' }}>
			{/* <Head title="" props={props} /> */}
			<SectionHero />
			<main>
				<SectionIntro />
				<SectionProfile />
				<SectionCourses />
				{/*
				<SectionTours />
				<SectionQuotes />*/}
				<SectionFAQs />
			</main>
		</Layout>
	)
}

export default IndexPage
