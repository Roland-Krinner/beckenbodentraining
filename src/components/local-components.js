import React, { useContext } from 'react'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import { Link } from 'gatsby'
import Styles from './local-components.module.scss'

const SubPage = ({ children, data: { classes } }) => {
	return <main className={`pt-5 pt-lg-8 pb-8 pb-sm-10 ${classes}`}>{children}</main>
}

const Section = ({ children, data: { classes } }) => {
	return <section className={`py-8 py-md-12 ${classes}`}>{children}</section>
}

const CTA = ({ children, data: { to, classes } }) => {
	return (
		<Link to={to} className={`btn btn-success btn-sm ${classes}`}>
			{children}
			<i className="fe fe-arrow-right ml-3"></i>
		</Link>
	)
}

const CtaExternal = ({ children, data: { to, classes } }) => {
	return (
		<a href={to} className={`btn btn-success btn-sm ${classes}`} target="_blank" rel="noopener noreferrer">
			{children}
			<i className="fe fe-external-link ml-3"></i>
		</a>
	)
}

const SVG = ({ svg, file, alt }) => {
	if (file.contentType === 'image/svg+xml') {
		if (svg && svg.content) {
			return <div dangerouslySetInnerHTML={{ __html: svg.content }} />
		}
		return <img src={file.url} alt={alt} />
	}
	// Fallback
	return <img src="" alt={alt} />
}

const ToggleMapCheckbox = () => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	return (
		<span className={Styles.formCheck}>
			<label className="no-select">
				<input
					type="checkbox"
					className="form-check-input"
					onChange={e => {
						if (e.target.checked) {
							dispatch({ type: 'SHOW_MAP' })
						} else {
							dispatch({ type: 'HIDE_MAP' })
						}
					}}
					checked={state.mapVisible}
				/>
				<span>
					<i className="fe fe-check"></i>
				</span>
				Mapbox verwenden
			</label>
		</span>
	)
}

export { SubPage, Section, SVG, CTA, CtaExternal, ToggleMapCheckbox }
