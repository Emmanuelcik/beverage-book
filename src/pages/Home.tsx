import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";
const Home = () => {
  const drinks = useAppStore((state) => state.drinks);
  console.log(drinks);

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]);
  return (
    <div>
      <h1 className="text-6xl font-extrabold">Recipies</h1>

      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {drinks.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p>Find great Recipies for your drinks</p>
      )}
    </div>
  );
};

export default Home;
