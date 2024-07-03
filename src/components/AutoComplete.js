import React, { useState, useEffect } from "react";
import Suggestions from "./Suggestions";

const AutoComplete = ({
  placeholder = "",
  staticData,
  fetchSuggestions,
  dataKey,
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = (input) => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(suggestions);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query);
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestion(result);
    } catch (error) {
      setError("Failed To Fetch Suggestions");
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue && inputValue.length > 1) {
      getSuggestions(inputValue);
    } else {
      setSuggestion([]);
    }
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestion([]);
  };
  return (
    <div className="container">
      <input
        value={inputValue}
        type="text"
        style={customStyles}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <Suggestions
            datakey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
