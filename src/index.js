import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';
import endpoint from './endpoint';
import './styles.scss';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse([]);
    setError(null);

    fetch(url + '/characters')
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setResponse(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);
  return [response, loading, error];
};

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters');
  const chachters = (response && response.characters) || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <p>Loading</p> : <CharacterList characters={characters} />}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
