import React, { useContext } from 'react';
import { CommentsContext } from '../../Context/CommentsContext';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import SortButton from './SortButton';

const CommentsSection = () => {
  const { comments, addComment, addReply } = useContext(CommentsContext);

  const handleNewComment = ({ name, content }) => {
    addComment(name, content);
  };

  const handleNewReply = ({ name, content, parentId }) => {
    addReply(parentId, name, content);
  };

  return (
    <div className='container'>
      <CommentForm onSubmit={handleNewComment} />
      {comments?.length > 0 && (
        <>
          <SortButton />
          {comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplySubmit={handleNewReply}
              showReply
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentsSection;
