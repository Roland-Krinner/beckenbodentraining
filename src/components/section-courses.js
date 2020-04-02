import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { useStaticQuery, graphql } from 'gatsby'
// import { BLOCKS } from '@contentful/rich-text-types'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// import { defaultTextOptions } from './format-options'
import { Section } from './local-components'
// import Styles from './section-profile.module.scss'

const Courses = () => {
	return (
		<Section data={{ classes: 'xxx__normalize-last-p bg-gray-200' }}>
			<Container>
				<Row className="justify-content-center align-items-center">
					<Col xs={12}>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id molestias corrupti fugiat repellat! Nisi natus mollitia quos beatae aperiam hic voluptas laudantium, nam molestiae, corporis maiores sit provident, dignissimos error pariatur ipsa ea quo commodi ut labore delectus iste. Corrupti ex similique ab aperiam minus numquam hic, quibusdam, impedit exercitationem sunt, architecto sed. Recusandae in culpa sit magnam qui eaque quidem repellendus unde! Provident optio exercitationem
							nemo qui, quam reiciendis aspernatur hic rem perferendis dolorem ratione debitis fuga, quos itaque dignissimos quidem. Commodi optio in quibusdam laudantium quisquam minus officia earum maiores, quod odit temporibus cum repellendus ducimus provident quas?
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id molestias corrupti fugiat repellat! Nisi natus mollitia quos beatae aperiam hic voluptas laudantium, nam molestiae, corporis maiores sit provident, dignissimos error pariatur ipsa ea quo commodi ut labore delectus iste. Corrupti ex similique ab aperiam minus numquam hic, quibusdam, impedit exercitationem sunt, architecto sed. Recusandae in culpa sit magnam qui eaque quidem repellendus unde! Provident optio exercitationem
							nemo qui, quam reiciendis aspernatur hic rem perferendis dolorem ratione debitis fuga, quos itaque dignissimos quidem. Commodi optio in quibusdam laudantium quisquam minus officia earum maiores, quod odit temporibus cum repellendus ducimus provident quas?
						</p>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id molestias corrupti fugiat repellat! Nisi natus mollitia quos beatae aperiam hic voluptas laudantium, nam molestiae, corporis maiores sit provident, dignissimos error pariatur ipsa ea quo commodi ut labore delectus iste. Corrupti ex similique ab aperiam minus numquam hic, quibusdam, impedit exercitationem sunt, architecto sed. Recusandae in culpa sit magnam qui eaque quidem repellendus unde! Provident optio exercitationem
							nemo qui, quam reiciendis aspernatur hic rem perferendis dolorem ratione debitis fuga, quos itaque dignissimos quidem. Commodi optio in quibusdam laudantium quisquam minus officia earum maiores, quod odit temporibus cum repellendus ducimus provident quas?
						</p>
					</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default Courses
