import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchCategoriesList } from "../store/catergriesSlice";
import { Link, useNavigate } from "react-router-dom";

// import "./sidebar.scss";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.list);

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);

  return (
    <div className="sidebarContainer">
      <div>
        <button onClick={() => navigate("/")}>HomePage</button>
        {category.map((category:any) => (
          <li key={category.id}>
            <Link to={`/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
