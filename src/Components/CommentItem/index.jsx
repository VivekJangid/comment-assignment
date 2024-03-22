import React, { useState, useContext, useMemo } from 'react';
import DeleteIcon from '../../Trash.png';
import './CommentItem.css';
import CommentForm from '../CommentForm';
import { CommentsContext } from '../../Context/CommentsContext';

const CommentItem = ({ comment, onReplySubmit, showReply = false }) => {
  const { replies, updateComment, updateReply, deleteComment, deleteReply } =
    useContext(CommentsContext);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReply = (reply) => {
    onReplySubmit(reply);
    setIsReplying(false);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const repliesForComment = useMemo(
    () => replies.filter((reply) => reply.commentId === comment.id),
    [replies, comment.id]
  );

  const handleEdit = (editedText) => {
    if (showReply) {
      // this will handle the comment -> as replies can be done on comment only
      updateComment(comment.id, editedText);
    } else {
      // Call context function to update a comment
      updateReply(comment.id, editedText);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (showReply) {
      // this will handle the comment -> as replies can be done on comment only
      deleteComment(comment.id);
    } else {
      // Call context function to update a comment
      deleteReply(comment.id);
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className='commentContainer'>
        <div className='commentItem'>
          <div className='commentHeader'>
            <span className='commentUserName'>{comment.userName}</span>
            <span className='commentDate'>
              {formatDate(comment.created_at)}
            </span>
          </div>
          {isEditing ? (
            <CommentForm
              onSubmit={handleEdit}
              editMode
              currentComment={comment.text}
              onCancel={() => setIsEditing(!isReplying)}
            />
          ) : (
            <p className='commentContent'>{comment.text}</p>
          )}
          <div className='commentActions'>
            {showReply && (
              <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? 'Cancel' : 'Reply'}
              </button>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
        <img
          className='icon deleteIcon'
          src={DeleteIcon}
          onClick={handleDelete}
          alt='deleteIcon'
        />
      </div>
      <div className='commentReply'>
        {isReplying && (
          <CommentForm
            onSubmit={handleReply}
            parentId={comment.id}
            onCancel={() => setIsReplying(!isReplying)}
          />
        )}
        {repliesForComment?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onReplySubmit={onReplySubmit}
          />
        ))}
      </div>
    </>
  );
};

export default CommentItem;
