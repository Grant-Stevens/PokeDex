import { usePokemonContext } from "@/context/pokemonContext";
import Spinner from "../spinner";
import styles from "./pokemon_details.module.scss";
import { getRandomMoveset } from "@/helpers/pokemon";

const PokemonDetails = () => {
  const { pokemon, isLoading } = usePokemonContext();

  return (
    <div className={styles.details}>
      {isLoading ? (
        <Spinner />
      ) : !pokemon ? (
        <p>There was error retrieving the data.</p>
      ) : (
        <>
          <span>
            <strong>Moveset:</strong>{" "}
            <ul className={styles.moveset}>
              {getRandomMoveset(pokemon.moves).map((move) => {
                return <li key={move}>{move}</li>;
              })}
            </ul>
          </span>
          <span>
            <strong>Typical height:</strong> {pokemon.height}&quot;
          </span>
          <span>
            <strong>Typical weight:</strong> {pokemon.height}&quot;
          </span>
          <span>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((ability, index) => {
              if (index === pokemon.abilities.length - 1) return ability.name;
              return `${ability.name}, `;
            })}
          </span>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
