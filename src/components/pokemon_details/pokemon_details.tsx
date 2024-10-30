import { typeColors, usePokemonContext } from "@/context/pokemonContext";
import Spinner from "../spinner";
import styles from "./pokemon_details.module.scss";

const PokemonDetails = () => {
  const { pokemon, isLoading } = usePokemonContext();

  console.log("DEBUG:", pokemon);

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
              {pokemon.moves &&
                pokemon.moves.map((move) => (
                  <li
                    key={move.name}
                    style={{
                      background:
                        move.type === "normal"
                          ? "#f5f5f5"
                          : typeColors[move.type],
                    }}
                  >
                    {move.name}
                  </li>
                ))}
            </ul>
          </span>
          <span>
            <b>Typical height:</b> {pokemon.height}&quot;
          </span>
          <span>
            <b>Typical weight:</b> {pokemon.height}lb
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
