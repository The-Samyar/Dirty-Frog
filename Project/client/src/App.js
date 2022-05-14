import { Features } from "./components/Features/Features";
import Header from "./components/Header/Header";
import './App.css'
import HeaderForm from "./components/HeaderForm/HeaderForm";
import FeaturedRooms from "./components/FeaturedRooms/FeaturedRooms";
import Stats from "./components/Stats/Stats";

function App() {
  return (
    <div className="App">
      <Header />
      <HeaderForm />
      <Features />
      <FeaturedRooms />
      <Stats />
    </div>
  );
}

export default App;
