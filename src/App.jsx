import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://express-rev.vercel.app/movies");
      const data = await response.data;
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const movieToPost = async (event) => {
    event.preventDefault();
    try {
      const postedMovie = await axios.post(
        "https://express-rev.vercel.app/movies",
        {
          id: id,
          title: title,
          year: year,
        }
      );
      console.log(postedMovie);
    } catch (error) {
      setError(error);
    } finally {
      fetchData();
      setId();
      setTitle("");
      setYear();
    }
  };
  // const movieToPut = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const putMovie = await axios.put("http://localhost:8000/movies", {
  //       id: id,
  //       title: title,
  //       year: year,
  //     });
  //     console.log(putMovie);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     fetchData();
  //     setId();
  //     setTitle("");
  //     setYear();
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(id, title, year);

  console.log(data);
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data.map((data) => (
        <div className="map-area" key={data.id}>
          <h2>The Movie title : {data.title}</h2>
          <p>The Year is :{data.year}</p>
        </div>
      ))}
      <form onSubmit={movieToPost}>
        <input
          type="number"
          placeholder="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
}

export default App;

//  {data.map((movie) => {
//         <>
//           <h1>
//             {movie.id}
//             {movie.title}
//             {movie.year}
//           </h1>
