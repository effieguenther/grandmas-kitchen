import { Card, CardTitle, Col, Row, Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/recipe.css';

export default function Recipe({ recipe }) {
    const title = recipe.title ? recipe.title.toUpperCase() : '';
    const source = recipe.source || '';
    const category = recipe.category || '';
    const equipment = recipe.equipment || [];
    const ingredient_groups = recipe.ingredients || [];

    return (
        <Card className='recipe-card'>
            <CardTitle>
                <Row>
                    <Col xs='8'>
                        {title}
                    </Col>
                    <Col className='print-btn'>
                        <Button>
                            <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faPrint} />
                        </Button>
                    </Col>
                </Row>
                <div className='subtitle'>
                    <p><span className='bold'>source: </span>{source}</p>
                    <p><span className='bold'>category: </span> {category}</p>
                </div>
            </CardTitle>    
            <Container fluid>
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