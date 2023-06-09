import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useParams } from "react-router-dom";
import { fetchImageByCategory, fetchloadMore} from "../store/catsByCategorySlice";

import "./catsByCategory.scss";

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
      {category.map((image) => (
        <div key={uuid()}>
          <img src={image.url} alt="cat" />
        </div>
      ))}
      <button onClick={handleloadMore}>Load More</button>
    </div>
  );
}

export default Category;
