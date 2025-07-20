import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import AllMatches from './pages/AllMatches';
import UpcomingMatches from './pages/UpcomingMatches';
import FantasySquad from './pages/FantasySquad';

import PrivateRoute from './components/PrivateRoute';
import CurrentMatch from './pages/CurrentMatch';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/all-matches" element={<AllMatches />} />
        <Route path="/upcoming" element={<UpcomingMatches />} />


     <Route path="/match/:id" element={<CurrentMatch />} />
      <Route
  path="/fantasy/:id"
  element={
    <PrivateRoute>
      <FantasySquad />
    </PrivateRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;
