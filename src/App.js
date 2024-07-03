import logo from "./logo.svg";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if(!response.ok){
      throw new Error("Network Response was not Ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  return (
    <div>
      <h1>Auto-Suggestion / TypeHead</h1>
      <AutoComplete
        placeholder={"Enter Receipe"}
        // staticData = {staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Receipes</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
