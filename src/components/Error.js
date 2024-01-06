import { Container } from "reactstrap"

const Error = (props) => {
    console.log("props", props);
    return (
        <Container>
            <p>Error: </p>
        </Container>
    )
}

export default Error;