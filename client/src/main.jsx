import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './home/Home.jsx'
// import FolderStructure from './pages/folderStructure/FolderStructure.jsx'
// import FolderStructure from './folderStructure/FolderStructure.jsx';
import Index from './route/index.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <FolderStructure />
    <Index />
  // {/* </React.StrictMode>, */}
)
