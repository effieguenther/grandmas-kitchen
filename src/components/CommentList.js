import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { post } from "../utils/fetch"
import Loading from './Loading';
import Comment from './Comment';
import '../css/comment.css';

export default function CommentList({ recipeId }) {
    const [comments, setComments] = useState(null)
    const [stateLoading, setStateLoading] = useState(true);
    const { isLoading, isError, data, error } = useQuery(['comments', recipeId], () => post(`recipes/comments/${recipeId}`), { staleTime: 0 });

    useEffect(() => {
        if (data?.comments) {
            setComments(data?.comments);
        }
    }, [data])

    useEffect(() => {
        console.log(isLoading);
        setStateLoading(isLoading);
    }, [isLoading])

    return stateLoading ? (<Loading />)
    : isError
    ? (<p>{error}</p>)
    : (
        <div className='comment-list'>
            <p className='comment-title'>Comments</p>
            <hr className='mb-4'/>
            {
                comments && (comments.length !== 0)
                ? (comments.map((comment, idx) => (
                    <Comment comment={comment} key={idx} />
                )))
                : (<p className='no-comments'>no comments</p>)
            }
        </div>
    )
}
