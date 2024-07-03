import React from "react";

const Suggestions = ({
  suggestions = [],
  highlight,
  datakey,
  onSuggestionClick,
}) => {
  const getHiglightedText = (text,highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`,"gi"));
    return <span>
      {parts.map((part,index) => {
        return part.toLowerCase() === highlight.toLowerCase() ? (
<b key={index}>{part}</b>
        ):(
          part
        )
         
      })}
    </span>
  }
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = datakey ? suggestion[datakey] : suggestion;

        return <li className="suggestion-item" key={index}
        onClick={() => onSuggestionClick(suggestion)}
        >
          {getHiglightedText(currSuggestion,highlight)}</li>;
      })}
    </>
  );
};

export default Suggestions;
