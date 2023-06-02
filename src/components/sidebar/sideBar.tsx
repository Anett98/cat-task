import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchCategoriesList } from "../store/catergriesSlice";
import { Link, useNavigate } from "react-router-dom";

import "./sideBar.scss";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.list);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);

  return (
    <div className="sidebarContainer">
      <div className="categoriesList">
        <button onClick={() => navigate("/")}>Go Home</button>
        {category.map((e) => (
          <li key={e.id}>
            <Link to={`/${e.id}`}>{e.name}</Link>
          </li>
        ))}
        <div className="burgerMenu" onClick={() => setIsHide(!isHide)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={!isHide ? "mediaCategoriesList" : "showMediaCategoriesList"}
      >
        <button onClick={() => navigate("/")}>Go Home</button>
        {category.map((e) => (
          <li key={e.id}>
            <Link to={`/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
