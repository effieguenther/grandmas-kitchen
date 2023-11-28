import { Card, CardTitle, CardBody, Col, Row, Container } from 'reactstrap';

export default function Recipe({ recipe }) {
    const title = recipe.title ? recipe.title : '';
    const source = recipe.source ? recipe.source : '';
    const equipment = recipe.equipment ? recipe.equipment : [];
    const ingredient_groups = recipe.ingredients ? recipe.ingredients : [];

    return (
        <Card className='recipe-card'>
            <CardTitle>{title}</CardTitle>    
            <Container fluid>
                <p className='source'>source: {source}</p>
                <Row>
                {
                    ingredient_groups.map((group, idx) => (
                        <Col key={idx}>
                            {ingredient_groups.length > 1 && <p className='group-title'>{group.title}</p>}
                            <ul>
                                {
                                    group.ingredients.map((ingredient, idx) => (
                                        <li key={idx}>{ingredient}</li>
                                    ))
                                }
                            </ul>
                        </Col>
                    ))
                }
                </Row>
                <ol>
                    {
                        recipe.directions.map((direction, idx) => (
                            <li key={idx}>{direction}</li>
                        ))
                    }
                </ol>
            </Container>
        </Card>
  )
}
