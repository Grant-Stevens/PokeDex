import Image from "next/image";
import styles from "./pokemon.module.scss";
import Spinner from "../spinner";
import { typeColors, usePokemonContext } from "@/context/pokemonContext";

const Pokemon = () => {
  const { pokemon, isLoading } = usePokemonContext();

  return (
    <div className={styles.pokemon}>
      {isLoading ? (
        <Spinner />
      ) : !pokemon ? (
        <p>No pokemon data</p>
      ) : (
        <>
          <span className={styles.id}>#{pokemon.id}</span>
          <Image
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
            width={300}
            height={300}
          />
          <span className={styles.name}>{pokemon.name}</span>
          <div className={styles.types}>
            {pokemon.types &&
              pokemon.types.map((type) => (
                <span
                  key={type}
                  className={styles.type}
                  style={{ color: typeColors[type] }}
                >
                  {type}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
