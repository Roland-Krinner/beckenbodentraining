import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { formTextOptions, profileSectionTextOptions } from '../components/format-options'
import Layout from '../components/layout'
// import Head from '../components/head'
import { SubPage } from '../components/local-components'
import ContactForm from '../components/contact-form'
import ModalDialogRegistration from '../components/modal-dialog-registration'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import Styles from './kursangebot.module.scss'

export default props => {
	const dispatch = useContext(GlobalDispatchContext)
	const [prefilledText, setPrefilledText] = useState({ text: '' })

	const data = useStaticQuery(graphql`
		query {
			allContentfulSeiteKursangebot {
				edges {
					node {
						formularHeadline
						formularText {
							json
						}
						sektionen {
							headline
							subline
							detailsHeadline
							detailsPreis
							detailsZeit
							detailsDatum
							detailsPreisHinweis
							preisHinweisAnzeigen
							buttonText
							beschreibung {
								json
							}
						}
					}
				}
			}
		}
	`)
	const sektionen = data.allContentfulSeiteKursangebot.edges[0].node.sektionen
	const formularHeadline = data.allContentfulSeiteKursangebot.edges[0].node.formularHeadline
	const formularTextJSON = data.allContentfulSeiteKursangebot.edges[0].node.formularText.json

	const CardSection = ({ data: { section, idx } }) => {
		const margin = idx === 0 ? '' : 'mt-7'
		const headline = section.headline
		const subline = section.subline
		const detailsHeadline = section.detailsHeadline
		const detailsPreis = section.detailsPreis
		const detailsZeit = section.detailsZeit
		const detailsDatum = section.detailsDatum
		const detailsPreisHinweis = section.detailsPreisHinweis
		const preisHinweisAnzeigen = section.preisHinweisAnzeigen
		const buttonText = section.buttonText
		const beschreibungJSON = section.beschreibung.json

		return (
			<>
				<Container className={`${margin}`}>
					<h1 className="mb-0 h2">{headline}</h1>
					<p className="mb-4 mb-lg-5 text-muted">{subline}</p>
				</Container>
				<Container className={Styles.mobileContainer}>
					<Row>
						<Col xs={12}>
							<Card className={`shadow-dark-sm`}>
								<Card.Body className={`${Styles.cardBody}`}>
									<div className="d-flex flex-column align-items-start flex-md-row-reverse align-items-md-center">
										<span className="badge badge-secondary rounded mb-1 mb-md-0">{detailsPreis}</span>
										<h3 className="font-weight-bold mr-auto mb-0 d-none d-md-block">{detailsHeadline}</h3>
										<span className="font-size-sm text-gray-700 text-nowrap mr-auto d-md-none">{detailsHeadline}</span>
									</div>
									<hr />
									<div className="d-flex align-items-start mb-2">
										<i className="fe fe-clock mr-2 text-secondary"></i>
										<div>
											{detailsZeit.map((item, idx) => {
												return (
													<span className="badge badge-secondary-soft mr-1 align-top no-select" key={idx}>
														{item}
													</span>
												)
											})}
										</div>
									</div>
									<div className="d-flex align-items-start">
										<i className="fe fe-calendar mr-2 text-secondary"></i>
										<div>
											{detailsDatum.map((item, idx) => {
												return (
													<span className="badge badge-secondary-soft mr-1 align-top no-select" key={idx}>
														{item}
													</span>
												)
											})}
										</div>
									</div>
									<hr />
									{preisHinweisAnzeigen === true ? (
										<p className="h6 text-gray-700 mb-0 d-flex">
											<span className="mr-1">*</span>
											<span>{detailsPreisHinweis}</span>
										</p>
									) : (
										''
									)}
									<button
										type="button"
										className="btn btn-success btn-sm mt-4"
										onClick={() => {
											dispatch({ type: 'TOGGLE_REGISTRATION_MODAL' })
											setPrefilledText({ text: `Ich interessiere mich für den Kurs: "${headline}"` })
										}}
									>
										{buttonText}
									</button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Card className={`shadow-dark-sm mt-20 mt-sm-5`}>
								<Card.Body className={`${Styles.cardBody}`}>
									<div>{documentToReactComponents(beschreibungJSON, profileSectionTextOptions)}</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		)
	}

	return (
		<Layout pageInfo={{ pageName: 'kursangebot', pageType: 'subPage' }}>
			{/* <Head title="Profil" props={props} /> */}
			<SubPage data={{ classes: 'bg-gray-200' }}>
				{sektionen.map((section, idx) => {
					return <CardSection data={{ section, idx }} key={idx} />
				})}
			</SubPage>
			<ModalDialogRegistration data={{ headline: formularHeadline }}>
				{documentToReactComponents(formularTextJSON, formTextOptions)}
				<ContactForm data={{ prefilledText: prefilledText.text }} />
			</ModalDialogRegistration>
		</Layout>
	)
}
