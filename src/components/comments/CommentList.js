import { useEffect, useState } from "react"
import { Tooltip } from "reactstrap";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { post } from "../../utils/fetch"
import Loading from '../Loading';
import Comment from './Comment';
import CommentModal from './CommentModal';
import '../../css/comment.css';

export default function CommentList({ recipeId }) {
    const [comments, setComments] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const { isLoading, isError, data: commentData, error } = useQuery(['comments', recipeId], () => post(`recipes/comments/${recipeId}`));
    const { data: userData } = useQuery('currentUser', () => post('users'), {staleTime: Infinity});

    useEffect(() => {
        if (commentData?.comments) {
            setComments(commentData.comments);
        }
    }, [commentData])

    return isLoading 
    ? (<Loading />)
    : isError
    ? (<p>{error.message}</p>)
    : (
        <div className='comment-list'>
            <div className='d-flex align-items-center justify-content-center'>
                <p className='comment-section-header'>Comments</p>
                <button 
                    onClick={() => setIsOpen(true)} 
                    className='comment-btn blue-btn' 
                    disabled={userData.user ? false : true}
                    id='commentBtn'
                >
                    <FontAwesomeIcon icon={faComment} />
                </button>
                {
                    !userData.user && <Tooltip
                        isOpen={tooltipOpen}
                        target='commentBtn'
                        toggle={() => setTooltipOpen(!tooltipOpen)}
                        placement='bottom'
                    >
                        Log in to comment
                    </Tooltip>

                }
            </div>
            <hr />
            {
                comments && (comments.length !== 0)
                ? (comments.map((comment, idx) => comment.authorId?.display_name && (
                    <Comment comment={comment} recipeId={recipeId} key={idx} />
                )))
                : (<p className='no-comments'>no comments</p>)
            }
            <CommentModal recipeId={recipeId} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}
