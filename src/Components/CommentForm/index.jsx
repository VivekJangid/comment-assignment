import React, { useState } from 'react';

const CommentForm = ({
  onSubmit,
  parentId = null,
  editMode = false,
  currentComment = '',
  onCancel = () => {},
}) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState(currentComment);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      onSubmit(content);
    } else {
      onSubmit({ name, content, parentId });
    }
    setName('');
    setContent('');
  };

  return (
    <form className='commentForm' onSubmit={handleSubmit}>
      {!editMode && (
        <>
          <h3>{parentId ? 'Reply' : 'Comment'}</h3>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
          />
        </>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? 'Reply' : 'Comment'}
        required
      />
      {/* {parentId && <button onClick={onCancel}>CANCEL</button>} */}
      <button type='submit'>POST</button>
    </form>
  );
};

export default CommentForm;
