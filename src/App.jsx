import React, {useState, useEffect, useCallback} from "react";
import JokeList from "./components/JokeList";
import "./App.css";
import AddJoke from "./components/addJoke";

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [jokesLoading, setJokesLoading] = useState(false);
  const [error, setError] = useState(null);
  let content = <p>No jokes found!</p>;

  const fetchJokesHandler = useCallback(async () => {
    setJokesLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jokes-study-default-rtdb.firebaseio.com/jokes.json', {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) throw new Error('Произошла ошибка загрузки!');

      const data = await response.json();
      const jokes = [];

      for (const key in data) {
        jokes.push({
          id: key,
          type: data[key].type,
          punchline: data[key].punchline,
          setup: data[key].setup,
        });
      }

      setJokes(jokes);
    } catch (e) {
      setError(e.message);
    } finally {
      setJokesLoading(false);
    }
  }, []);

  const postJoke = async (joke) => {
    await fetch('https://jokes-study-default-rtdb.firebaseio.com/jokes.json', {
      method: 'POST',
      body: JSON.stringify(joke),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]);

  if (jokes && jokes.length > 0) content = <JokeList jokes={jokes} />;
  if (jokesLoading) content = <p>Loading jokes...</p>;
  if (error) content = <p>{error}</p>;

  return (
    <React.Fragment>
      <section>
        <AddJoke onAdd={postJoke}/>
      </section>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;
