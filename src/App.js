import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login Comp/Login';
import { useStateValue } from './Context Api/StateProvider';
import Chat from './Pages/ChatSection/Chat';
import Sidebar from './Pages/SidebarSection/Sidebar';

function App() {
  // const [user, setUSer] = useState(null);
  //pull the user state from the data there
  const[{user}, dispatch] = useStateValue();
  return (
    <div className="app">
     {
       !user? <Login/> :
       <div className="app__body">
       <Router>
             <Sidebar />
         <Switch>
         <Route path="/rooms/:roomId">
             <Chat />
           </Route>
           <Route path="/">
            
           </Route>
           
         </Switch>
       </Router>

     </div>
     }
     
    </div>
  );
}

export default App;
