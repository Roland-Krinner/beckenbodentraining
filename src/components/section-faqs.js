import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './local-components'
import { faqTextOptions, profileSectionTextOptions } from './format-options'

const FaqItem = ({ q, a, index }) => {
	return (
		<div className="d-flex">
			<div className="badge badge-lg badge-rounded-circle badge-success">
				<span>{index + 1}</span>
			</div>
			<div className="ml-5">
				<h4>{q}</h4>
				<div className={`text-gray-700 mb-6 mb-md-8`}>{documentToReactComponents(a, profileSectionTextOptions)}</div>
			</div>
		</div>
	)
}

const SectionFAQs = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteStartseite {
				edges {
					node {
						faQsText {
							raw
						}
						faQsListe {
							frage
							antwortText {
								raw
							}
						}
						kontaktBox {
							raw
						}
					}
				}
			}
		}
	`)
	const faQsTextJSON = JSON.parse(data.allContentfulSeiteStartseite.edges[0].node.faQsText.raw)
	const faqsList = data.allContentfulSeiteStartseite.edges[0].node.faQsListe
	const faqsLength = faqsList.length
	const kontaktBoxJSON = JSON.parse(data.allContentfulSeiteStartseite.edges[0].node.kontaktBox.raw)

	return (
		<Section data={{ classes: 'bg-white' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">{documentToReactComponents(faQsTextJSON, faqTextOptions)}</Col>
				</Row>
				<Row>
					<Col className="col-12 col-md-6">
						{faqsList.map((faq, idx) => {
							if (idx < faqsLength / 2) {
								return <FaqItem q={faq.frage} a={JSON.parse(faq.antwortText.raw)} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
					<Col className="col-12 col-md-6">
						{faqsList.map((faq, idx) => {
							if (idx >= faqsLength / 2) {
								return <FaqItem q={faq.frage} a={JSON.parse(faq.antwortText.raw)} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
				</Row>
			</Container>
			<Container className={`mt-7 mt-lg-8 container`} style={{ zIndex: 2 }}>
				<Row className={`justify-content-center text-center`}>
					<Col xs={12} sm={10} lg={8}>
						<Card className={`shadow-dark-sm overflow-hidden card-border border-success`}>
							<Card.Body className={`normalize-last-p py-6 py-md-8 py-lg-9`}>{documentToReactComponents(kontaktBoxJSON, faqTextOptions)}</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default SectionFAQs