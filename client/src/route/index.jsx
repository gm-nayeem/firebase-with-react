import React from 'react'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import FolderStructure from '../folderStructure/FolderStructure';

const Index = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<FolderStructure />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Index;