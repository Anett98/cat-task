import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchCategoriesList } from "../store/catergriesSlice";
import { Link, useNavigate } from "react-router-dom";

import "./sideBar.scss";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.list);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);

  return (
    <div className="sidebarContainer">
      <div className="categoriesList">
        <button onClick={() => navigate("/")}>Homepage</button>
        {category.map((image) => (
          <li key={image.id}>
            <Link to={`/${image.id}`}>{image.name}</Link>
          </li>
        ))}
        <div className="burgerMenu" onClick={() => setIsHidden(!isHidden)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={!isHidden ? "mediaCategoriesList" : "showMediaCategoriesList"}
      >
        <button onClick={() => navigate("/")}>Homepage</button>
        {category.map((image) => (
          <li key={image.id}>
            <Link to={`/${image.id}`}>{image.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
