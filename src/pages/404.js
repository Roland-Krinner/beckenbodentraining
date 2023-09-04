import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { SubPage } from '../components/local-components'

const NotFound = props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeite404 {
				edges {
					node {
						title
						text {
							raw
						}
					}
				}
			}
		}
	`)
	const title = data.allContentfulSeite404.edges[0].node.title
	const textJSON = JSON.parse(data.allContentfulSeite404.edges[0].node.text.raw)

	return (
		<Layout pageInfo={{ pageName: 'page-not-found', pageType: 'subPage', classes: 'bg-gray-200' }}>
			<Seo title={title} pathname={props.location.pathname} />
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

export default NotFound
