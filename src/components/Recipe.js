import { Card, CardTitle, Col, Row, Container } from 'reactstrap';

export default function Recipe({ recipe }) {
    const title = recipe.title ? recipe.title.toUpperCase() : '';
    const source = recipe.source ? recipe.source : '';
    const category = recipe.category ? recipe.category : '';
    const equipment = recipe.equipment ? recipe.equipment : [];
    const ingredient_groups = recipe.ingredients ? recipe.ingredients : [];

    return (
        <Card className='recipe-card'>
            <CardTitle>{title}</CardTitle>    
            <Container fluid>
                <div className='subtitle'>
                    <p><span className='bold'>source: </span>{source}</p>
                    <p><span className='bold'>category: </span> {category}</p>
                </div>
                <hr />
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
                { equipment.length > 0 && (
                    <ul className='equipment'>
                        <li>
                            <span className='bold'>equipment: </span>
                        {
                            equipment.map((equipment, idx) => (
                                <span key={idx}>{equipment}</span>
                            ))
                        }
                        </li>
                    </ul>
                )}
                </Row>
                <Row>
                    <Col>
                        <ul>
                            {
                                recipe.directions.map((direction, idx) => (
                                    <li key={idx}>{direction}</li>
                                ))
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Card>
  )
}