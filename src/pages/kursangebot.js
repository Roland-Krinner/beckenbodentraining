import React, { useContext, useState, useEffect } from 'react'
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
import withLocation from '../components/withLocation'
import Flickity from '../components/flickity'
import Styles from './kursangebot.module.scss'
import '../scss/kursangebot.scss'

const Kursangebot = ({ hash }) => {
	useEffect(() => {
		if (hash !== '') {
			setTimeout(() => {
				navigateTo(hash)
			}, 350)
		}
	}, [hash])

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
							termine {
								headline
								wochentag
								datum
							}
							termineAnzeigen
							detailsPreisHinweis
							preisHinweisAnzeigen
							buttonText
							beschreibungText {
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

	const NavCard = ({ data: { section, idx } }) => {
		return (
			<div className="card mobile-card shadow-dark-sm" key={idx}>
				<button
					className="btn"
					data-target={`kurs-${idx + 1}`}
					onClick={e => {
						handleNavigateTo(e, hash)
					}}
				>
					{section.headline}
				</button>
			</div>
		)
	}

	const CardSection = ({ data: { section, idx } }) => {
		const margin = idx === 0 ? '' : 'mt-7'
		const headline = section.headline
		const subline = section.subline
		const detailsHeadline = section.detailsHeadline
		const termine = section.termine
		const termineAnzeigen = section.termineAnzeigen
		const detailsPreisHinweis = section.detailsPreisHinweis
		const preisHinweisAnzeigen = section.preisHinweisAnzeigen
		const buttonText = section.buttonText
		const beschreibungTextJSON = section.beschreibungText.json

		const RegisterBtn = ({ classes = '' }) => {
			return (
				<button
					type="button"
					className={`btn btn-success btn-sm mt-7 ${classes}`}
					onClick={() => {
						dispatch({ type: 'TOGGLE_REGISTRATION_MODAL' })
						setPrefilledText({ text: `Ich interessiere mich für den Kurs: "${headline}"` })
					}}
				>
					{buttonText}
				</button>
			)
		}

		return (
			<React.Fragment key={idx}>
				<Container className={`${margin} kurs-${idx + 1}`}>
					<h1 className="mb-0 h2">{headline}</h1>
					<p className="mb-4 mb-lg-5 text-muted">{subline}</p>
				</Container>
				<Container className={Styles.mobileContainer}>
					<Row>
						<Col xs={12}>
							<Card className={`shadow-dark-sm`}>
								<Card.Body className={`${Styles.cardBody}`}>
									<h3 className="font-weight-bold mr-auto mb-0">{detailsHeadline}</h3>
									<hr />
									{termineAnzeigen === true ? (
										<Flickity options={{ contain: true, freeScroll: true, prevNextButtons: true, pageDots: false, draggable: true }}>
											{termine.map((termin, index) => {
												return (
													<div className="carousel-cell" key={`${idx}-${index}`}>
														<h5 className="font-weight-bold text-secondary mb-3 mb-sm-5">
															<i className="fe fe-calendar mr-1"></i> {termin.headline}
														</h5>
														<div className="d-flex align-items-start mb-2">
															<div>
																{termin.wochentag.map((item, idx) => {
																	return (
																		<span className="badge badge-secondary-soft align-top no-select xxtext-secondary" key={`badge1-${idx}`}>
																			{item}
																		</span>
																	)
																})}
															</div>
														</div>
														<div className="d-flex align-items-start">
															<div>
																{termin.datum.map((item, idx) => {
																	return (
																		<span className="badge badge-secondary-soft align-top no-select" key={`badge2-${idx}`}>
																			{item}
																		</span>
																	)
																})}
															</div>
														</div>
													</div>
												)
											})}
										</Flickity>
									) : (
										''
									)}
									<RegisterBtn classes="d-block d-md-none" />
									<div className="mt-7">{documentToReactComponents(beschreibungTextJSON, profileSectionTextOptions)}</div>
									{preisHinweisAnzeigen === true ? (
										<>
											<hr />
											<p className="h6 text-gray-700 mb-0 d-flex">
												<span className="mr-1">*</span>
												<span>{detailsPreisHinweis}</span>
											</p>
										</>
									) : (
										''
									)}
									<RegisterBtn classes="d-none d-md-block" />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}

	return (
		<Layout pageInfo={{ pageName: 'kursangebot', pageType: 'subPage', classes: 'kursangebot' }}>
			{/* <Head title="Profil" props={props} /> */}
			<SubPage data={{ classes: 'bg-gray-200' }}>
				<div className="scrollable-wrapper d-block d-lg-none mb-4">
					<div className="scrollable">
						<div className="scrollable-content">
							{sektionen.map((section, idx) => {
								return <NavCard data={{ section, idx }} key={idx} />
							})}
						</div>
					</div>
				</div>
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

const handleNavigateTo = e => {
	const target = e.target.getAttribute('data-target')
	if (window.history.pushState) {
		window.history.pushState(null, null, `#${target}`)
	} else {
		window.location.hash = `#${target}`
	}
	navigateTo(target)
}

const navigateTo = targetId => {
	const duration = 600
	const offset = 10
	scrollTo(targetId, duration, offset)
}

const scrollTo = (targetId, duration, offset) => {
	const target = document.querySelector(`.${targetId}`)
	if (target === null) {
		return
	}
	const targetPosition = target.getBoundingClientRect().top
	const startPosition = window.pageYOffset
	const distance = targetPosition - offset
	let startTime = null

	const animate = currentTime => {
		if (startTime === null) {
			startTime = currentTime
		}
		const timeElapsed = currentTime - startTime
		const run = ease(timeElapsed, startPosition, distance, duration)
		window.scrollTo(0, run)
		if (timeElapsed < duration) {
			requestAnimationFrame(animate)
		}
	}

	requestAnimationFrame(animate)
}

const ease = (t, b, c, d) => {
	// easeInOutQuad
	t /= d / 2
	if (t < 1) return (c / 2) * t * t + b
	t--
	return (-c / 2) * (t * (t - 2) - 1) + b
}

export default withLocation(Kursangebot)
