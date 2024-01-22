import { Col } from "reactstrap"

export default function Footer() {
  return (
    <>
        <Col xs='12'>
            <p>Questions or concerns? Contact me!</p>
        </Col>
        <Col className='d-flex flex-column'>
            <a href='' target='_blank'>Facebook</a>
            <a href='' target='_blank'>Github</a>
        </Col>
    </>
  )
}
