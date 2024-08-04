import { Row, Col, Container } from "reactstrap";
import { useQuery } from "react-query";
import { post } from "../utils/fetch";
import RecipeList from "../components/recipes/RecipeList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Conversions from "../components/Conversions";
import grandmaPic from "../images/grandma.jpeg";
import "../css/recipe-page.css";

export default function RecipePage() {
  const { isLoading, isError, error } = useQuery(
    "currentUser",
    () => post("users"),
    { staleTime: Infinity }
  );

  // wait to display the page until it's confirmed if a user is logged in or not //

  if (isLoading) return <Loading />;
  if (isError) return <p>{error}</p>;
  return (
    <Container fluid className="background">
      <Row className="header">
        <Header />
      </Row>
      <Row className="banner">
        <Col className="d-flex flex-column align-items-center justify-content-center mb-2">
          <div className="d-flex align-items-center">
            <p className="title">Grandma Sandy's Kitchen</p>
          </div>
          <p className="subtitle">
            Over 250 recipes memorialized in honor of Sandy Daniel
          </p>
        </Col>
        <Col xs="12" md="5" className="img-container">
          <img src={grandmaPic} className="recipe-gma-pic" />
        </Col>
      </Row>
      <RecipeList />
      <Conversions />
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}
