import "./Typeahead.css";
import { useState, useCallback } from "react";

function Typeahead(props) {
  const [currValue, setcurrValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchChange = e => {
    setcurrValue(e.target.value);
    searchDebounced(e.target.value);
  };

  const findSuggestions = value => {
    let { cities } = props;
    if (value) {
      const regex = new RegExp(`^${value}`, `i`);
      setSuggestions(cities.sort().filter(v => regex.test(v)));
    }
  };

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
    console.log(item);
    setcurrValue(item.toString());
  };

  const renderSuggestions = () => {
    return (
      <ul>
        {suggestions.map(item => (
          <li
            key={item.toString()}
            onClick={e => updateInput(e.target.innerHTML)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1>Typeahead Mock array</h1>
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

export default Typeahead;
