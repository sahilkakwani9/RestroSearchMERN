import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import List from './components/List';
import Restaurants from './components/Restaurants';
import Login from './components/Login';
import AddReview from './components/AddReview';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
          <Route path="/" element={<List/>} />
          <Route path="/restaurants" element={<List/>} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            element={<Restaurants />}
          />
          <Route 
            path="/login"
            element={
              <Login login={login} />
            }
          />
        </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
