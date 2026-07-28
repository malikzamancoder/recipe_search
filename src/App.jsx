import { useState } from "react";
import { Search, MapPin } from "lucide-react";

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
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            🍽 Recipe Finder
          </h1>

          <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
            Discover thousands of delicious recipes from around the world in
            seconds.
          </p>

        </div>

        {/* Search */}

        <div className="mt-12 flex justify-center">

          <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">

            <input
              type="text"
              placeholder="Search recipes... Chicken, Pasta, Pizza"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getRecipes()}
              className="flex-1 bg-transparent px-6 py-5 text-white placeholder:text-gray-400 outline-none"
            />

            <button
              onClick={getRecipes}
              className="px-8 bg-orange-500 hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 font-semibold text-white"
            >
              <Search size={20} />
              Search
            </button>

          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex justify-center mt-12">

            <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

          </div>
        )}

        {/* Empty State */}

        {!loading && recipes.length === 0 && (
          <div className="text-center mt-20">

            <h2 className="text-2xl font-semibold text-gray-300">
              Search your favourite meal 🍕
            </h2>

          </div>
        )}

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">

          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              className="group rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 hover:border-orange-400 transition-all duration-500 hover:-translate-y-3 hover:shadow-orange-500/20 hover:shadow-2xl"
            >

              <div className="overflow-hidden">

                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-6">

                <h2 className="text-white text-xl font-bold line-clamp-2">
                  {meal.strMeal}
                </h2>

                <div className="flex items-center gap-2 mt-4 text-orange-400">

                  <MapPin size={18} />

                  <span>{meal.strArea}</span>

                </div>

                <button
                  className="mt-6 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                >
                  View Recipe
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default App;