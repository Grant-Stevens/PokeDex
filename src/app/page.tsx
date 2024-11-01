"use client";

import LeftPage from "../components/pokedex_left_page_layout";
import RightPage from "../components/pokedex_right_page_layout";
import Image from "next/image";
import Hinge from "../components/hinge";
import Pokemon from "@/components/pokemon/pokemon";
import { usePokemonContext } from "@/context/pokemonContext";
import PokemonDetails from "@/components/moveset";
import PokemonStats from "@/components/pokemon_stats";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import styles from "./page.module.scss";

export default function Home() {
  const { pokemon, getPokemon } = usePokemonContext();

  function handleNav(offset: number) {
    let newSelector;
    switch (offset) {
      case -1:
      case 1:
        newSelector = pokemon ? pokemon.id + offset : 1;
        break;
      default:
        newSelector = Math.floor(Math.random() * 1025);
    }
    if (newSelector > 0 && newSelector <= 1025) getPokemon(newSelector);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LeftPage>
          <div className={styles.screen}>
            <Pokemon />
          </div>
          <div className={styles["nav-buttons"]}>
            <button
              className={[
                pokemon?.id === 1 ? styles.disabled : undefined,
                styles.button,
              ].join(" ")}
              onClick={() => handleNav(-1)}
              disabled={pokemon?.id === 1}
            >
              <Image
                src={"/arrow_backward.png"}
                alt={"back"}
                height={30}
                width={30}
              />
            </button>
            <button className={styles.button} onClick={() => handleNav(0)}>
              <QuestionMarkRoundedIcon style={{ filter: "Invert()" }} />
            </button>
            <button
              className={[
                pokemon?.id === 1025 ? styles.disabled : undefined,
                styles.button,
              ].join(" ")}
              onClick={() => handleNav(1)}
              disabled={pokemon?.id === 1025}
            >
              <Image
                src="/arrow_forward.png"
                alt={"back"}
                height={30}
                width={30}
              />
            </button>
          </div>
        </LeftPage>
        <Hinge />
        <RightPage>
          <div className={styles["stats-screen"]}>
            <PokemonStats />
          </div>
          <div className={styles["green-screen"]}>
            <PokemonDetails />
          </div>
        </RightPage>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
