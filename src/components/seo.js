import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, lang, pathname }) => {
	const site = useStaticQuery(
		graphql`
			query {
				allContentfulDatenMetadaten {
					edges {
						node {
							description
							keywords
							siteName
							siteUrl
							socialImage {
								file {
									url
								}
							}
						}
					}
				}
			}
		`
	)

	const pageTitle = `${title} | ${site.allContentfulDatenMetadaten.edges[0].node.siteName}`
	const metaDescription = site.allContentfulDatenMetadaten.edges[0].node.description
	const keywords = site.allContentfulDatenMetadaten.edges[0].node.keywords
	const hotSpot = 'top_right'
	// const twitterSizes = '1200x628'
	const ogSizes = '1200x630'
	const sharerImageBaseUrl = site.allContentfulDatenMetadaten.edges[0].node.socialImage.file.url
	// const twitter_image = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${twitterSizes.split('x')[0]}&h=${twitterSizes.split('x')[1]}`
	const og_image = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${ogSizes.split('x')[0]}&h=${ogSizes.split('x')[1]}`
	const canonical = pathname ? `${site.allContentfulDatenMetadaten.edges[0].node.siteUrl}${pathname}` : null

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={pageTitle}
			link={
				canonical
					? [
							{
								rel: 'canonical',
								href: canonical,
							},
					  ]
					: []
			}
			meta={[
				{
					name: 'description',
					content: metaDescription,
				},
				{
					name: 'keywords',
					content: keywords.join(','),
				},
				{
					property: `og:title`,
					content: pageTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:title`,
					content: pageTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(
				og_image
					? [
							{
								property: 'og:image',
								content: og_image,
							},
							{
								property: 'og:image:width',
								content: `${ogSizes.split('x')[0]}`,
							},
							{
								property: 'og:image:height',
								content: `${ogSizes.split('x')[1]}`,
							},
							{
								name: 'twitter:card',
								content: 'summary_large_image',
							},
					  ]
					: [
							{
								name: 'twitter:card',
								content: 'summary',
							},
					  ]
			)}
		/>
	)
}

SEO.defaultProps = {
	title: '',
	lang: 'de',
}

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	lang: PropTypes.string,
	pathname: PropTypes.string,
}

export default SEO
