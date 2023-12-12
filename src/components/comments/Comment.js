import { Card, Button } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EditCommentModal from './EditCommentModal';
import DeleteCommentModal from './DeleteCommentModal';
import '../../css/comment.css';

export default function Comment({ comment, currentUserId, recipeId }) {
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',

    }
    const name = comment.authorId.display_name || "";
    const authorId = comment.authorId._id || "";
    const commentId = comment._id || "";
    const text = comment.text || "";
    let date = comment.createdAt 
        ? new Date(comment.createdAt).toLocaleString('en-US', dateOptions)
        : "";

    return (
        <Card className='comment'>
            <p className='comment-text'>{text}</p>
            <hr />
            <div className='comment-header'>
                {
                    currentUserId === authorId &&
                    (
                        <div className='edit-btns'>
                            <Button onClick={() => setEditIsOpen(true)}>
                                <FontAwesomeIcon icon={faPenToSquare} size='sm' />
                            </Button>
                            <Button onClick={() => setDeleteIsOpen(true)}>
                                <FontAwesomeIcon icon={faTrashCan} size='sm' />
                            </Button>
                        </div>
                    )

                }
                <p className='comment-name'>{name}</p>
                <p>-</p>
                <p className='comment-date'>{date}</p>
            </div>
            <EditCommentModal isOpen={editIsOpen} setIsOpen={setEditIsOpen} commentText={text} commentId={commentId} recipeId={recipeId} />
            <DeleteCommentModal isOpen={deleteIsOpen} setIsOpen={setDeleteIsOpen} commentId={commentId} recipeId={recipeId} />
        </Card>
    )
}
