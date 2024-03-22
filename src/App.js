// App.js
import React from 'react';
import { CommentsProvider } from './Context/CommentsContext';
import CommentsSection from './Components/CommentsSection';
import './App.css'

const App = () => {
  return (
    <CommentsProvider>
      <CommentsSection />
    </CommentsProvider>
  );
};

export default App;
