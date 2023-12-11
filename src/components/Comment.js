import { Card } from 'reactstrap';
import '../css/comment.css';

export default function Comment({ comment }) {
    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',

    }
    const name = comment.authorId.display_name || "";
    const text = comment.text || "";
    let date = comment.createdAt 
        ? new Date(comment.createdAt).toLocaleString('en-US', dateOptions)
        : "";

    return (
        <Card className='comment'>
            <div className='comment-header'>
                <p className='comment-name'>{name}</p>
                <p>-</p>
                <p className='comment-date'>{date}</p>
            </div>
            <hr />
            <p className='comment-text'>{text}</p>
        </Card>
    )
}
