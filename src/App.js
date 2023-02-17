import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';


function App() {

  return (
    <div className='app'>
        <Route path='/' component={HomePage} exact />
        <Route path='/chats' component={ChatPage} exact />
    </div>
  );
}
export default App;
