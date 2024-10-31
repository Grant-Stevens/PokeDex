import { typeColors, usePokemonContext } from "@/context/pokemonContext";
import Spinner from "../spinner";
import Image from "next/image";
import styles from "./moveset.module.scss";

const Moveset = () => {
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
                  <div className={[styles.icon, styles[move.type]].join(" ")}>
                    {/* <Image
                      src={"/pokemon_type_icons.jpg"}
                      alt={move.type}
                      height={150}
                      width={150}
                    /> */}
                  </div>

                  <span className={styles.name}>
                    {move.name.replace("-", " ")}
                  </span>
                  <span className={styles.power}>{move.power}</span>
                  <span className={styles["damage-type"]}>
                    {move.damageType}
                  </span>
                  <span className={styles.pp}>{move.pp}</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Moveset;
