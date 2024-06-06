
import './App.css';
import Show from './Components/Show';
import Edit from './Components/Edit'
import Create from './Components/Create';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import 'bootstrap/dist/css'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Show />}></Route>
          <Route path='/create' element={ <Create />}></Route>
          <Route path='/edit/:id' element={ <Edit />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
