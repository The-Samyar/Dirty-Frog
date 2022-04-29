import { Features } from "./components/Features/Features";
import Header from "./components/Header/Header";
import './App.css'
import HeaderForm from "./components/HeaderForm/HeaderForm";
import FeaturedRooms from "./components/FeaturedRooms/FeaturedRooms";


function App() {
  return (
    <div className="App">
      <Header />
      <HeaderForm />
      <Features />
      <FeaturedRooms />
    </div>
  );
}

export default App;
