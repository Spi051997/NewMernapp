
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {Routes,Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';


function App() {
  return (
 <div className='App'>
   <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/chat' element={<ChatPage/>}></Route>
   </Routes>
   </div>
  );
}

export default App;
