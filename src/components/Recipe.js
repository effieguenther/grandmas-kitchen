import { Card, CardTitle, Col, Row, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import '../css/recipe.css';
import { put } from '../utils/fetch';
import CommentModal from './comments/CommentModal';
import CommentList from './comments/CommentList';

export default function Recipe({ recipe, currentUser }) {
    const title = recipe.title ? recipe.title.toUpperCase() : '';
    const source = recipe.source || '';
    const category = recipe.category || '';
    const equipment = recipe.equipment || [];
    const ingredient_groups = recipe.ingredients || [];
    const id = recipe._id || '';
    const [favorite, setFavorite] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [favIsLoading, setFavIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const addToFavorites = async () => {
        setFavIsLoading(true);
        const response = await put('users/updateFavorites', { favorite: id });
        //triggers another call to get current user to update favorites list
        queryClient.invalidateQueries('currentUser');
        setFavorite(!favorite);
    }

    useEffect(() => {
        setFavIsLoading(false);
    }, [favorite])

    useEffect(() => {
        const inFavorites = currentUser.favorites.includes(id);
        setFavorite(inFavorites);
    }, [currentUser])

    return (
        <>
        <Card className='recipe-card'>
            <CardTitle>
                <Row>
                    <Col xs='6' sm='7' md='8' lg='9' xl='10'>
                        {title}
                    </Col>
                    <Col className='recipe-btns'>
                        <button className='blue-btn'>
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                        <button onClick={() => setIsOpen(true)} className='blue-btn'>
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                        {
                            favIsLoading
                            ? (
                                <button disabled className={favorite ? 'pink-btn' : 'blue-btn'}>
                                    <FontAwesomeIcon icon={faHeart} beat className="loader" />
                                </button>
                            )
                            : (
                                <button className={favorite ? 'pink-btn' : 'blue-btn'} onClick={addToFavorites}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            )
                        }
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
            <CommentModal userId={currentUser._id} recipeId={id} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </Card>
        <CommentList recipeId={id} currentUserId={currentUser._id}/>
        </>
  )
}