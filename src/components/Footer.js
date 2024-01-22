import { Col } from "reactstrap"

export default function Footer() {
  return (
    <>
        <Col xs='12'>
            <p>Questions or concerns? Contact me!</p>
        </Col>
        <Col className='d-flex flex-column'>
            <a href='https://www.facebook.com/effie.guenther/' target='_blank'>Facebook</a>
            <a href='mailto:effiegguenther@gmail.com' target='_blank'>effiegguenther@gmail.com</a>
            <a href='https://github.com/effieguenther' target='_blank'>Github</a>
        </Col>
    </>
  )
}
