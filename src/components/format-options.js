import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { CTA } from './local-components'
// import { utils } from '../utils'
// const textMuted = utils.getColor('textMuted')

const BrandData = ({ data: { searchStr, customClasses } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulKontaktDaten {
				edges {
					node {
						name
						strasse
						ort
						telefon
						eMail
					}
				}
			}
		}
	`)
	const name = data.allContentfulKontaktDaten.edges[0].node.name
	const strasse = data.allContentfulKontaktDaten.edges[0].node.strasse
	const ort = data.allContentfulKontaktDaten.edges[0].node.ort
	const telefon = data.allContentfulKontaktDaten.edges[0].node.telefon
	const eMail = data.allContentfulKontaktDaten.edges[0].node.eMail

	const paragraphClasses = customClasses ? customClasses : `text-muted`

	if (searchStr === '$$contactData$$') {
		return <>{/* <p className={`${paragraphClasses}`}>
					{name}
					<br />
					{street}
					<br />
					{city}
					<br />
					{country}
				</p>
				<p className={`${paragraphClasses}`}>
					Telefon:{' '}
					<a href={`tel:${phonePlain}`} className={`text-success text-decoration-none`}>
						{phone}
					</a>
					<br />
					E-Mail:{' '}
					<a href={`mailto:${eMail}`} className={`text-success text-decoration-none`}>
						{eMail}
					</a>
				</p> */}</>
	} else if (searchStr === '$$imprintAddress$$') {
		return <p className={`${paragraphClasses}`}>{/* {name}
				<br />
				{street}
				<br />
				{city}
				<br />
				{country} */}</p>
	} else if (searchStr === '$$imprintContact$$') {
		return <p className={`${paragraphClasses}`}>{/* Telefon: {phone}
				<br />
				E-Mail: {eMail}
				<br />
				Webseite: {websiteName} */}</p>
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
				{telefon.map((number, idx, self) => {
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
				})}
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
		[BLOCKS.HEADING_1]: (node, children) => <h1 className={`mb-0 mb-sm-1`}>{children}</h1>,
		[BLOCKS.HEADING_6]: (node, children) => <p className={`font-size-lg mb-4 mb-lg-5 text-muted`}>{children}</p>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`font-weight-bold`}>{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return ''
				// return <BrandData data={{ searchStr: node.content[0].value }} />
			} else {
				return <p className={`font-size-lg text-muted`}>{children}</p>
			}
		},
		[BLOCKS.HR]: (node, children) => <hr className={`border-gray-300 my-6`} />,
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
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
					<span className={`h6 text-uppercase text-muted`}>{children}</span>
				</span>
			)
		},
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-lg text-muted mb-7 mb-md-9`}>{children}</p>,
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
}

// const legalTextOptions = {
// 	renderNode: {
// 		[BLOCKS.PARAGRAPH]: (node, children) => {
// 			if (node.content.length === 1 && node.content[0].value === '') {
// 				return ''
// 			} else if (node.content[0].value.indexOf('$$') !== -1) {
// 				return <BrandData data={{ searchStr: node.content[0].value, customClasses: 'mb-4 mb-md-6' }} />
// 			} else {
// 				return <p className={`mb-4 mb-md-6`}>{children}</p>
// 			}
// 		},
// 		[BLOCKS.HR]: (node, children) => <hr className={`border-dark my-6`} />,
// 		[BLOCKS.UL_LIST]: (node, children) => <ul className={`pl-4 pb-5`}>{children}</ul>,
// 		[BLOCKS.LIST_ITEM]: (node, children) => <li className={`normalize-last-p`}>{children}</li>,
// 		[INLINES.HYPERLINK]: (node, children) => {
// 			if (node.data.uri && node.data.uri.startsWith('/')) {
// 				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
// 			} else {
// 				return (
// 					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
// 						{children}
// 					</a>
// 				)
// 			}
// 		},
// 	},
// 	renderMark: {
// 		[MARKS.BOLD]: text => <span className={`font-weight-bold`}>{text}</span>,
// 	},
// }

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

// const formTextOptions = {
// 	renderNode: {
// 		[BLOCKS.HEADING_5]: (node, children) => <h5 className={`mb-3 font-weight-bold`}>{children}</h5>,
// 		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-sm ${textMuted}`}>{children}</p>,
// 		[INLINES.HYPERLINK]: (node, children) => {
// 			if (node.data.uri && node.data.uri.startsWith('/')) {
// 				return (
// 					<Link to={node.data.uri} className={`text-success text-decoration-none`}>
// 						{children}
// 					</Link>
// 				)
// 			} else {
// 				return (
// 					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
// 						{children}
// 					</a>
// 				)
// 			}
// 		},
// 	},
// }

// export { defaultTextOptions, faqTextOptions, formTextOptions, options, cardBodyTextOptions, legalTextOptions }

export { heroTextOptions, defaultTextOptions, infoBoxTextOptions, faqTextOptions }
