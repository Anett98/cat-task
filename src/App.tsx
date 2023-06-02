import React from "react";
import Sidebar from "./components/sidebar/sideBar";
import { Route, Routes } from "react-router";
import "./App.scss";

const Home = React.lazy(() => import("./components/homePage/homePage"));
const Category = React.lazy(
  () => import("./components/catsByCategory/catsByCategory")
);

function App() {
  return (
    <React.Suspense fallback={<div>...LOADING...</div>}>
      <div className="App">
        <Sidebar />
        <div className="containerBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Category />} />
          </Routes>
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
