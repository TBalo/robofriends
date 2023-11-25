import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

function App () {

const [robots, setRobots] = useState([]);
const [searchfield, setSearchfield] = useState('');

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
},[]);

  const onSearchChange = (event) => {
    setSearchfield({ searchfield: event.target.value });
  };

    const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading.......</h1>
    ) : (
      <div className="tc">
        <h1>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
export default App;

