import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { CTA, CtaExternal, ToggleMapCheckbox } from './local-components'

const BrandData = ({ data: { searchStr, customClasses } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulDatenKontaktdaten {
				edges {
					node {
						name
						strasse
						ort
						telefon
						land
						eMail
						websiteName
					}
				}
			}
		}
	`)
	const name = data.allContentfulDatenKontaktdaten.edges[0].node.name
	const strasse = data.allContentfulDatenKontaktdaten.edges[0].node.strasse
	const ort = data.allContentfulDatenKontaktdaten.edges[0].node.ort
	const land = data.allContentfulDatenKontaktdaten.edges[0].node.land
	const telefon = data.allContentfulDatenKontaktdaten.edges[0].node.telefon
	const eMail = data.allContentfulDatenKontaktdaten.edges[0].node.eMail
	const websiteName = data.allContentfulDatenKontaktdaten.edges[0].node.websiteName

	const paragraphClasses = customClasses ? customClasses : `text-muted`

	if (searchStr === '$$kontaktDaten$$') {
		return (
			<>
				<p className={`${paragraphClasses}`}>
					{name}
					<br />
					{strasse}
					<br />
					{ort}
					<br />
					{land}
				</p>
				<p className={`${paragraphClasses}`}>
					Telefon:{' '}
					<a href={`tel:${telefon}`} className={`text-success text-decoration-none`}>
						{telefon}
					</a>
					<br />
					E-Mail:{' '}
					<a href={`mailto:${eMail}`} className={`text-success text-decoration-none`}>
						{eMail}
					</a>
				</p>
			</>
		)
	} else if (searchStr === '$$impressumAddresse$$') {
		return (
			<p className={`${paragraphClasses}`}>
				{name}
				<br />
				{strasse}
				<br />
				{ort}
				<br />
				{land}
			</p>
		)
	} else if (searchStr === '$$impressumKontakt$$') {
		return (
			<p className={`${paragraphClasses}`}>
				Telefon: {telefon}
				<br />
				E-Mail: {eMail}
				<br />
				Webseite: {websiteName}
			</p>
		)
	} else if (searchStr === '$$adresse$$') {
		return (
			<p className={`${paragraphClasses}`}>
				{name}
				<br />
				{strasse}
				<br />
				{ort}
			</p>
		)
	} else if (searchStr === '$$telefon$$') {
		return (
			<p className={`${paragraphClasses}`}>
				<a href={`tel:${telefon}`} className="text-reset">
					{telefon}
				</a>
				{/* {telefon.map((number, idx, self) => {
					return idx < self.length - 1 ? (
						<>
							<a href={`tel:${number}`} className="text-reset" key={idx}>
								{number}
							</a>
							<br />
						</>
					) : (
						<a href={`tel:${number}`} className="text-reset" key={idx}>
							{number}
						</a>
					)
				})} */}
			</p>
		)
	} else if (searchStr === '$$email$$') {
		return (
			<p className={`${paragraphClasses}`}>
				<a href={`mailto:${eMail}`} className="text-reset">
					{eMail}
				</a>
			</p>
		)
	} else if (searchStr === '$$KartenEinstellungen$$') {
		return <ToggleMapCheckbox />
	}
	return ''
}

const heroTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => <h1 className={`display-4`}>{children}</h1>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else {
				return <p className={`lead text-muted mb-1 mb-md-8`}>{children}</p>
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`text-success text-nowrap`}>{text}</span>,
	},
}

const defaultTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => <h1 className={`mb-0 xxx__mb-sm-1`}>{children}</h1>,
		[BLOCKS.HEADING_6]: (node, children) => <p className={`font-size-lg mb-4 mb-lg-5 text-muted`}>{children}</p>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`font-weight-bold`}>{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return <BrandData data={{ searchStr: node.content[0].value, customClasses: 'text-gray-700' }} />
			} else {
				return <p className={`font-size-lg text-gray-700`}>{children}</p>
			}
		},
		[BLOCKS.HR]: (node, children) => <hr className={`border-gray-300 my-6`} />,
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-success-soft mt-1 mr-4`}>
					<i className={`fe fe-check`}></i>
				</div>
				<span className={`mb-2`}>{children}</span>
			</div>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`font-weight-bold`}>{text}</span>,
	},
}

const infoBoxTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_6]: (node, children) => <h6 className={`font-weight-bold text-uppercase text-gray-700 mb-2`}>{children}</h6>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return <BrandData data={{ searchStr: node.content[0].value, customClasses: 'text-muted mb-5' }} />
			} else {
				return <p className={`text-muted mb-5`}>{children}</p>
			}
		},
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-success-soft mt-1 mr-4`}>
					<i className={`fe fe-check`}></i>
				</div>
				<span className={`mb-2`}>{node.content[0].content[0].value}</span>
			</div>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: 'mt-0 mt-md-6' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`font-weight-bold`}>{text}</span>,
	},
}

const faqTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_6]: (node, children) => {
			return (
				<span className="badge badge-pill badge-gray-700-soft mb-3">
					<span className={`h6 text-uppercase text-gray-700`}>{children}</span>
				</span>
			)
		},
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-lg text-gray-700 mb-7 mb-md-9`}>{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return <CtaExternal data={{ to: node.data.uri, classes: '' }}>{children}</CtaExternal>
				// return (
				// 	<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
				// 		{children}
				// 	</a>
				// )
			}
		},
	},
}

const mapTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-lg text-muted xxx__mb-5`}>{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return <CtaExternal data={{ to: node.data.uri, classes: 'mt-5 mt-md-7' }}>{children}</CtaExternal>
			}
		},
	},
	// https://github.com/contentful/rich-text/issues/96
	// https://www.npmjs.com/package/@contentful/rich-text-react-renderer
	renderText: text => {
		return text.split('\n').reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment]
		}, [])
	},
}

const legalTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return <BrandData data={{ searchStr: node.content[0].value, customClasses: 'mb-4 mb-md-6' }} />
			} else {
				return <p className={`mb-4 mb-md-6`}>{children}</p>
			}
		},
		[BLOCKS.HR]: (node, children) => <hr className={`border-dark my-6`} />,
		[BLOCKS.UL_LIST]: (node, children) => <ul className={`pl-4 pb-5`}>{children}</ul>,
		[BLOCKS.LIST_ITEM]: (node, children) => <li className={`normalize-last-p`}>{children}</li>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`font-weight-bold`}>{text}</span>,
	},
}

// const options = {
// 	renderNode: {
// 		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`mb-5 font-weight-bold`}>{children}</h3>,
// 		[BLOCKS.HEADING_2]: (node, children) => <h2 className={`mb-5 font-weight-bold`}>{children}</h2>,
// 		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`${textMuted}`}>{children}</p>,
// 		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
// 		[BLOCKS.LIST_ITEM]: (node, children) => (
// 			<div className={`d-flex list-item`}>
// 				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
// 					<i className={`fe fe-check`}></i>
// 				</div>
// 				<span className={`mb-2`}>{children}</span>
// 			</div>
// 		),
// 	},
// 	renderMark: {
// 		[MARKS.BOLD]: text => <span className={`${textMuted} font-weight-bold`}>{text}</span>,
// 	},
// }

// const cardBodyTextOptions = {
// 	renderNode: {
// 		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`${textMuted} xxx__${textMuted}`}>{children}</p>,
// 		[BLOCKS.HEADING_6]: (node, children) => <p className={`h6 ${textMuted} mb-0`}>{children}</p>,
// 		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
// 		[BLOCKS.LIST_ITEM]: (node, children) => (
// 			<div className={`d-flex list-item`}>
// 				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
// 					<i className={`fe fe-check`}></i>
// 				</div>
// 				<span className={`mb-2`}>{children}</span>
// 			</div>
// 		),
// 	},
// 	renderMark: {
// 		[MARKS.BOLD]: text => <span className={`${textMuted} font-weight-bold`}>{text}</span>,
// 	},
// }

const formTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_5]: (node, children) => <h5 className={`mb-3 font-weight-bold`}>{children}</h5>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-sm text-gray-700`}>{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className={`text-success text-decoration-none`}>
						{children}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
}

const cookieBannerTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-sm text-gray-700`}>{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className={`text-success text-decoration-none`}>
						{children}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
}

export { heroTextOptions, defaultTextOptions, infoBoxTextOptions, faqTextOptions, formTextOptions, legalTextOptions, cookieBannerTextOptions, mapTextOptions }
