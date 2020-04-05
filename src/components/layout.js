import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Notification from '../components/notification'
import CookieBanner from '../components/cookie-banner'
import ModalDialog from './modal-dialog'
import Styles from './layout.module.scss'
import '../scss/default.scss'

export default ({ children, pageInfo }) => {
	const customClasses = typeof pageInfo.classes !== 'undefined' ? pageInfo.classes : ''
	return (
		<div className={Styles.container}>
			<div className={`${Styles.content} ${customClasses}`}>
				<Header pageInfo={pageInfo} />
				{children}
			</div>
			<Footer pageInfo={pageInfo} />
			<Notification />
			<CookieBanner />
			<ModalDialog />
		</div>
	)
}
