import "./Typeahead.css";
import { useState, useCallback } from "react";

function Typeahead_fetch(props) {
  const [currValue, setcurrValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const findSuggestions = value => {
    fetch(`https://api.publicapis.org/entries?title=${value}`)
      .then(res => res.json())
      .then(json => setSuggestions(json.entries));
  };

  const searchChange = e => {
    setcurrValue(e.target.value);
    searchDebounced(e.target.value);
  };

  /*const findSuggestions = value => {
    let { cities } = props;
    if (value) {
      const regex = new RegExp(`^${value}`, `i`);
      setSuggestions(cities.sort().filter(v => regex.test(v)));
    }
  };*/

  const debounce = (func, wait) => {
    let timer = null;
    return function() {
      timer && clearTimeout(timer);
      timer = setTimeout(() => func(...arguments), wait);
    };
  };

  const searchDebounced = useCallback(
    debounce(value => findSuggestions(value), 5000),
    []
  ); // usecallback keeps fn instance same btw renders

  const updateInput = item => {
    setcurrValue(item.toString());
  };

  const renderSuggestions = () => {
    return (
      <ul>
        {suggestions &&
          suggestions.map(item => (
            <li
              key={item.toString()}
              onClick={e => updateInput(e.target.innerHTML)}
            >
              {item.API}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      <h1> Typeahead with fetch </h1>
      <form>
        <input
          type="search"
          name="searchbox"
          id="searchbox"
          value={currValue}
          onChange={e => searchChange(e)}
        />
        <input type="submit" />
        {renderSuggestions()}
      </form>
    </>
  );
}

export default Typeahead_fetch;
