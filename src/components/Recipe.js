import { Card, CardTitle, Col, Row, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import '../css/recipe.css';
import { put, post } from '../utils/fetch';
import CommentList from './comments/CommentList';

export default function Recipe({ recipe }) {
    const { data } = useQuery('currentUser', () => post('users'));
    const title = recipe.title ? recipe.title.toUpperCase() : '';
    const source = recipe.source || '';
    const category = recipe.category || '';
    const equipment = recipe.equipment || [];
    const ingredient_groups = recipe.ingredients || [];
    const id = recipe._id || '';
    const [favorite, setFavorite] = useState(false);
    const [favIsLoading, setFavIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const blob1 = useRef();
    const blob2 = useRef();
    const blob3 = useRef();
    const card = useRef();
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const addToFavorites = async () => {
        try {
            setFavIsLoading(true);
            await put('users/updateFavorites', { favorite: id });
            //triggers another call to get current user to update favorites list
            queryClient.invalidateQueries('currentUser');
            setFavorite(!favorite);
        } catch (err) {
            console.err(err);
            setFavIsLoading(false);
        }
    }

    const downloadPdf = async () => {
        try {
            const response = await post(`recipes/pdf/${id}`, {}, 'blob');
            console.log('response blob', response)
            const pdfBlob = new Blob([response], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');    
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setFavIsLoading(false);
    }, [favorite])

    useEffect(() => {
        if (data.user) {
            const inFavorites = data.user.favorites.includes(id);
            setFavorite(inFavorites);
        }
    }, [data, id])

    useEffect(() => {   

        // Randomized stains
        const randomSize1 = getRandomNumber(30, 60);
        const randomSize2 = getRandomNumber(45, 75);
        const randomSize3 = getRandomNumber(75, 100);

        blob1.current.style.width = randomSize1 + 'px';
        blob1.current.style.height = randomSize1 + 'px';
        blob1.current.style.top = getRandomNumber(100, card.current.clientHeight - randomSize1) + 'px';
        blob1.current.style.left = getRandomNumber(20, card.current.clientWidth - randomSize1) + 'px';
        blob1.current.style.borderRadius = `${randomSize1}% ${randomSize2}% ${randomSize3}% 33%`

        blob2.current.style.width = randomSize2 + 'px';
        blob2.current.style.height = randomSize2 + 'px';
        blob2.current.style.top = getRandomNumber(100, card.current.clientHeight - randomSize2) + 'px';
        blob2.current.style.left = getRandomNumber(20, card.current.clientWidth - randomSize2) + 'px';
        blob2.current.style.borderRadius = `${randomSize2}% ${randomSize1}% ${randomSize3}% 33%`

        blob3.current.style.width = randomSize3 + 'px';
        blob3.current.style.height = randomSize3 + 'px';
        blob3.current.style.top = getRandomNumber(100, card.current.clientHeight - randomSize3) + 'px';
        blob3.current.style.left = getRandomNumber(20, card.current.clientWidth - randomSize3) + 'px';
        blob3.current.style.borderRadius = `${randomSize3}% ${randomSize1}% ${randomSize2}% 33%`

    }, []);

    return (
        <Row>
            <Col xs='12' lg='7'>
            <div ref={card}>
                <Card className='recipe-card'>
                    <CardTitle>
                        <Row className='mb-1'>
                            <Col xs='7' sm='9'>
                                {title}
                            </Col>
                            <Col className='recipe-btns'>
                                <button onClick={downloadPdf} className='blue-btn'>
                                    <FontAwesomeIcon icon={faPrint} />
                                </button>
                                {
                                    favIsLoading
                                    ? (
                                        <button disabled className={favorite ? 'pink-btn' : 'blue-btn'}>
                                            <FontAwesomeIcon icon={faHeart} beat className="loader" />
                                        </button>
                                    )
                                    : (
                                        <button className={favorite ? 'pink-btn' : 'blue-btn'} onClick={addToFavorites} disabled={data.user ? false : true}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    )
                                }
                            </Col>
                        </Row>
                        <Row className='subtitle'>
                            <Col xs='12'>
                                <p><span className='bold'>source: </span>{source}</p>
                            </Col>
                            <Col>
                                <p><span className='bold'>category: </span> {category}</p>
                            </Col>
                        </Row>
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
                <div className='blob' ref={blob1}></div>
                <div className='blob' ref={blob2}></div>
                <div className='blob' ref={blob3}></div>
            </div>
            </Col>
            <Col>
                <CommentList recipeId={id} />
            </Col>
        </Row>
  )
}