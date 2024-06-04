// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       hi smitha
//     </div>
//   );
// }

// export default App;

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EditBook from './components/EditBook';
import NewBook from './components/NewBook';
import BookDetails from './components/BookDetails';
import BookStore from './components/BookStore';
function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<BookStore/>} path="/books" />
          <Route element={<NewBook/>} path="/books/new" />
          <Route element={<BookDetails/>} path="/books/:id" />
          <Route element={<EditBook/>} path="/books/edit/:id" />
        </Routes>
      </BrowserRouter>
      {/* hii smitha */}

    </div>
  )
}

export default App;