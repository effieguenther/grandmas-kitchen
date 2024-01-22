import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { post } from "../../utils/fetch"
import Loading from '../Loading';
import Comment from './Comment';
import '../../css/comment.css';

export default function CommentList({ recipeId }) {
    const [comments, setComments] = useState(null)
    const { isLoading, isError, data: commentData, error } = useQuery(['comments', recipeId], () => post(`recipes/comments/${recipeId}`));

    useEffect(() => {
        if (commentData?.comments) {
            setComments(commentData.comments);
        }
    }, [commentData])

    return isLoading 
    ? (<Loading />)
    : isError
    ? (<p>{error}</p>)
    : (
        <div className='comment-list'>
            <p className='comment-section-header'>Comments</p>
            {
                comments && (comments.length !== 0)
                ? (comments.map((comment, idx) => comment.authorId?.display_name && (
                    <Comment comment={comment} recipeId={recipeId} key={idx} />
                )))
                : (<p className='no-comments'>no comments</p>)
            }
        </div>
    )
}
