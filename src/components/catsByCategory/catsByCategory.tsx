import { useEffect, useState } from "react";
import uuid from 'react-uuid'
// import "./category.scss";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useParams } from "react-router-dom";
import { fetchImageByCategory, fetchloadMore } from "../store/catsByCategorySlice";

function Category() {
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.images.category);

  function handleloadMore() {
    setPage((prevPage) => prevPage + 1);
    if (id) dispatch(fetchloadMore({ id, page }));
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchImageByCategory(id));
    }
  }, [dispatch, id]);

  return (
    <div className="photosContainer">
      {category.map((e) => (
        <div key={uuid()}>
          <img src={e.url} alt="" />
        </div>
      ))}
      <button onClick={handleloadMore}>Load More</button>
    </div>
  );
}

export default Category;
