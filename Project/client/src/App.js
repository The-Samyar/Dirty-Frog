import './App.css'
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BookNow from "./pages/BookNow";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rooms" element={<Rooms />}></Route>
          <Route path="/room/:name" element={<RoomPage />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/bookNow" element={<BookNow />}></Route>
          <Route path="/bookNow?/*" element={<BookNow />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/Booking?/*" element={<Booking />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
