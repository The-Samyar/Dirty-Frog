import { Features } from "./components/Features/Features";
import Header from "./components/Header/Header";
import './App.css'
import HeaderForm from "./components/HeaderForm/HeaderForm";
import FeaturedRooms from "./components/FeaturedRooms/FeaturedRooms";
import Stats from "./components/Stats/Stats";
import Testimonials from "./components/Testimonials/Testimonials";


function App() {
  return (
    <div className="App">
      <Header />
      <HeaderForm />
      <Features />
      <FeaturedRooms />
      <Stats />
      <Testimonials />
    </div>
  );
}

export default App;
