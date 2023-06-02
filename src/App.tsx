import Sidebar from "./components/sidebar/sideBar";
import { Route, Routes } from "react-router";
import Home from "./components/homePage/homePage";
import Category from "./components/catsByCategory/catsByCategory";

// import "./App.scss";
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="containerBody">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
