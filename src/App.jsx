import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🍲 Recipe Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipe (e.g. chicken, pasta)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={getRecipes}>Search</button>
      </div>

      {loading && <p>Loading recipes...</p>}

      <div className="grid">
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <div className="card" key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <p>{meal.strArea}</p>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found 🔍</p>
        )}
      </div>
    </div>
  );
}

export default App;