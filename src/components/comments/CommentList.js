import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { post } from "../../utils/fetch"
import Loading from '../Loading';
import Comment from './Comment';
import '../../css/comment.css';

export default function CommentList({ recipeId, currentUserId }) {
    const [comments, setComments] = useState(null)
    const { isLoading, isError, data, error } = useQuery(['comments', recipeId], () => post(`recipes/comments/${recipeId}`));

    useEffect(() => {
        if (data?.comments) {
            setComments(data.comments);
        }
    }, [data])

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
                    <Comment comment={comment} currentUserId={currentUserId} recipeId={recipeId} key={idx} />
                )))
                : (<p className='no-comments'>no comments</p>)
            }
        </div>
    )
}
