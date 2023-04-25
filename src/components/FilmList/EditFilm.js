import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import AddNewFilm from "./AddNewFilm";

const EditFilm = () => {
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState({ loading: true, data: {} });
  useEffect(() => {
    if (filmId) {
      (async () => {
        try {
          const filmData = await axios.get(`${BACKEND_URL}/film/${filmId}`);
          console.log(filmData.data, "filmData", filmId);
          setFilmData({ loading: false, data: filmData.data });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [filmId]);
  return (
    <div>
      {!filmData.loading ? (
        <AddNewFilm filmId={filmId} filmData={filmData.data} />
      ) : null}
    </div>
  );
};

export default EditFilm;
