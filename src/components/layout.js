import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Notification from '../components/notification'
import Styles from './layout.module.scss'
import '../scss/default.scss'

export default ({ children, pageInfo }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<Header pageInfo={pageInfo} />
				{children}
			</div>
			<Footer pageInfo={pageInfo} />
			<Notification />
		</div>
	)
}
