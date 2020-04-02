import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { useStaticQuery, graphql } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// import { cardBodyTextOptions, defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
// import Head from '../components/head'
// import { utils } from '../utils/'
// import { SubPage, CTA, PictureFixedWidth } from '../components/kletterlehrer'
import Styles from './kurse.module.scss'

const Courses = props => {
	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			{/* <Head title="Kurse" props={props}/> */}
			<Container className={Styles.mobileContainer}>
				<Row>
					<Col xs={12}>
						<p>Kurse</p>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Courses
