import React, { createContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sortOrderKeys } from './utility';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
  });

  const [replies, setReplies] = useState(() => {
    const savedReplies = localStorage.getItem('replies');
    return savedReplies ? JSON.parse(savedReplies) : [];
  });

  const [sortOrder, setSortOrder] = useState(() => {
    const sortOrder = localStorage.getItem('sortOrder');
    return sortOrder || sortOrderKeys.DESCENDING;
  });

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('replies', JSON.stringify(replies));
  }, [replies]);

  const addComment = (userName, text) => {
    const newComment = {
      id: uuidv4(),
      userName,
      text,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setComments(comments.concat(newComment));
  };

  const updateComment = (commentId, newText) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, text: newText, updated_at: new Date() }
          : comment
      )
    );
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    setReplies(replies.filter((reply) => reply.commentId !== commentId));
  };

  const addReply = (commentId, userName, text) => {
    const newReply = {
      id: uuidv4(),
      commentId,
      userName,
      text,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setReplies(replies.concat(newReply));
  };

  const updateReply = (replyId, newText) => {
    setReplies(
      replies.map((reply) =>
        reply.id === replyId
          ? { ...reply, text: newText, updated_at: new Date() }
          : reply
      )
    );
  };

  const deleteReply = (replyId) => {
    setReplies(replies.filter((reply) => reply.id !== replyId));
  };

  const toggleSortOrder = () => {
    const newOrder =
      sortOrder === sortOrderKeys.DESCENDING
        ? sortOrderKeys.ASCENDING
        : sortOrderKeys.DESCENDING;

    localStorage.setItem('sortOrder', newOrder);
    setSortOrder(newOrder);
  };

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === sortOrderKeys.ASCENDING
        ? dateA - dateB
        : dateB - dateA;
    });
  }, [sortOrder, comments]);

  const sortedReplies = useMemo(() => {
    return [...replies].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === sortOrderKeys.ASCENDING
        ? dateA - dateB
        : dateB - dateA;
    });
  }, [sortOrder, replies]);

  const contextValue = {
    comments: sortedComments,
    addComment,
    updateComment,
    deleteComment,
    replies: sortedReplies,
    addReply,
    updateReply,
    deleteReply,
    sortOrder,
    toggleSortOrder,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
