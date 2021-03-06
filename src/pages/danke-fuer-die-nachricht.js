import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { SubPage } from '../components/local-components'

export default props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteDankeFurDieNachricht {
				edges {
					node {
						title
						text {
							json
						}
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeiteDankeFurDieNachricht.edges[0].node.title
	const textJSON = data.allContentfulSeiteDankeFurDieNachricht.edges[0].node.text.json

	return (
		<Layout pageInfo={{ pageName: 'danke', pageType: 'subPage', classes: 'bg-gray-200' }}>
			<SEO title={title} pathname={props.location.pathname} />
			<SubPage data={{ classes: '' }}>
				<Container>
					<Row>
						<Col xs={12} md={8}>
							{documentToReactComponents(textJSON, defaultTextOptions)}
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}
