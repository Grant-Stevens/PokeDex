import Image from "next/image";
import styles from "./pokemon.module.scss";
import { useEffect, useState } from "react";
import Spinner from "../spinner";

interface IPokemonProps {
  pokemonSelector: number;
}

export interface IPokemon {
  id: number;
  name: string;
  image: string;
  types: TypeString[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

type TypeString = keyof typeof typeColors;

const Pokemon = ({ pokemonSelector }: IPokemonProps) => {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelector}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon({
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          types: data.types.map((type: any) => type?.type?.name),
        });
        setLoading(false);
      });
  }, [pokemonSelector]);

  if (isLoading) return <Spinner />;
  if (!pokemon) return <p>No pokemon data</p>;

  const { id, name, image, types } = pokemon;

  return (
    <div className={styles.pokemon}>
      <span className={styles.id}>#{id}</span>
      <Image
        className={styles.image}
        src={image}
        alt={name}
        width={300}
        height={300}
      />
      <span className={styles.name}>{name}</span>
      <div className={styles.types}>
        {types &&
          types.map((type) => (
            <span
              key={type}
              className={styles.type}
              style={{ color: typeColors[type] }}
            >
              {type}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Pokemon;
