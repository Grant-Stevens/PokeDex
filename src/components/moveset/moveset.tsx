import {
  IMove,
  typeColors,
  TypeString,
  usePokemonContext,
} from "@/context/pokemonContext";
import UndoIcon from "@mui/icons-material/Undo";
import Spinner from "../spinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./moveset.module.scss";

const Moveset = () => {
  const { pokemon, isLoading } = usePokemonContext();
  const [moveDetailsToShow, setMoveDetailsToShow] = useState<IMove>();

  function handleMoveClick(move: IMove) {
    if (!move) return;
    setMoveDetailsToShow(move);
  }

  function handleBack() {
    setMoveDetailsToShow(undefined);
  }

  useEffect(() => {
    setMoveDetailsToShow(undefined);
  }, [pokemon]);

  if (isLoading) return <Spinner />;
  if (!pokemon) return <p>No Pokemon data.</p>;
  if (moveDetailsToShow) {
    return (
      <div className={styles["move-details"]}>
        <button className={styles["back-button"]} onClick={handleBack}>
          <UndoIcon />
        </button>
        <div
          className={styles["basic-info"]}
          style={{
            borderColor: typeColors[moveDetailsToShow.type as TypeString],
          }}
        >
          <div className={styles.type}>
            <div
              className={[styles.icon, styles[moveDetailsToShow.type]].join(
                " "
              )}
            />
            <span style={{ background: typeColors[moveDetailsToShow.type] }}>
              {moveDetailsToShow.type}
            </span>
          </div>
          <span className={styles.name}>
            {moveDetailsToShow.name.replace("-", " ")}
          </span>
          <span className={styles.pp}>PP: {moveDetailsToShow.pp}</span>
        </div>
        <div className={styles.details}>
          <span className={styles.category}>
            CATEGORY:{" "}
            <Image
              src={`/category_${moveDetailsToShow.damageType}.png`}
              alt={moveDetailsToShow.damageType as unknown as string}
              height={30}
              width={30}
            />
          </span>
          <span className={styles.power}>
            POWER: {moveDetailsToShow.power ?? "-"}
          </span>
          <span className={styles.accuracy}>
            ACCURACY: {moveDetailsToShow.accuracy ?? "-"}
          </span>
          <span className={styles.description}>
            {moveDetailsToShow.description}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <strong>Moves:</strong>{" "}
      <ul className={styles.moveset}>
        {pokemon.moves &&
          pokemon.moves.map((move) => (
            <li
              key={move.name}
              className={styles.move}
              style={{
                background:
                  move.type === "normal" ? "#f5f5f5" : typeColors[move.type],
              }}
              onClick={() => handleMoveClick(move)}
            >
              <div className={[styles.icon, styles[move.type]].join(" ")} />
              <span className={styles.name}>{move.name.replace("-", " ")}</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Moveset;
