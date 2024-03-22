import React, { useContext } from 'react';
import CaretDown from '../../caretDown.png';
import CaretUp from '../../caretUp.png';
import { CommentsContext } from '../../Context/CommentsContext';
import { sortOrderKeys } from '../../Context/utility';

const SortButton = () => {
  const { sortOrder, toggleSortOrder } = useContext(CommentsContext);
  return (
    <div className='sortContainer'>
      Sort By: Date and Time
      <img
        className='icon'
        onClick={toggleSortOrder}
        src={sortOrder === sortOrderKeys.DESCENDING ? CaretDown : CaretUp}
        alt='sortIcon'
      />
    </div>
  );
};

export default SortButton;
