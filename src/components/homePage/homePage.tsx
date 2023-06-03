import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchloadMore } from "../store/homePageSlice";
import { fetchImageByRandomImages } from "../store/homePageSlice";
import uuid from "react-uuid";

import "../catsByCategory/catsByCategory.scss";

function Home() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const randomized = useAppSelector(
    (state) => state.randomImages.randomizedCats
  );

  function handleloadMore() {
    setPage((prevPage) => prevPage + 1);
    dispatch(fetchloadMore({ page }));
  }

  useEffect(() => {
    dispatch(fetchImageByRandomImages());
  }, [dispatch]);

  return (
    <div className="photosContainer">
      {randomized.map((image) => (
        <div key={uuid()}>
          <img src={image.url} alt="cat" />
        </div>
      ))}
      <button onClick={handleloadMore}>Load More</button>
    </div>
  );
}

export default Home;
