"use client";

import LeftPage from "../components/pokedex_left_page_layout";
import RightPage from "../components/pokedex_right_page_layout";
import Image from "next/image";
import Hinge from "../components/hinge";
import styles from "./page.module.scss";
import Pokemon from "@/components/pokemon/pokemon";
import { usePokemonContext } from "@/context/pokemonContext";
import PokemonDetails from "@/components/pokemon_details";

export default function Home() {
  const { pokemonNum, setPokemonNum } = usePokemonContext();

  function handleNav(offset: number) {
    const newSelector = pokemonNum + offset;

    if (newSelector > 0 && newSelector < 1302) setPokemonNum(newSelector);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LeftPage>
          <div className={styles.screen}>
            <Pokemon />
          </div>
          <div className={styles["nav-buttons"]}>
            <Image
              className={pokemonNum === 1 ? styles.disabled : undefined}
              src="/arrow_backward.png"
              alt={"back"}
              height={50}
              width={50}
              onClick={() => handleNav(-1)}
            />
            <Image
              src="/arrow_forward.png"
              alt={"back"}
              height={50}
              width={50}
              onClick={() => handleNav(1)}
            />
          </div>
        </LeftPage>
        <Hinge />
        <RightPage>
          <div className={styles["green-screen"]}>
            <PokemonDetails />
          </div>
          <div className={styles["fake-button-panel"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </RightPage>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
