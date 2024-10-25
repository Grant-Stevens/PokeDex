"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IPokemonContext {
  pokemon: IPokemon | undefined;
  isLoading: boolean;
  pokemonNum: number;
  setPokemonNum: (id: number) => void;
}

export interface IPokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: { name: string }[];
  image: string;
  types: TypeString[];
  moves: {
    move: {
      name: string;
    };
  }[];
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

const PokemonContext = createContext<IPokemonContext | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};

export const PokemonProvider = ({ ...props }) => {
  const { children } = props;
  const [pokemonNum, setPokemonNum] = useState<number>(1);
  const [pokemon, setPokemon] = useState<IPokemon | undefined>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const getPokemon = useCallback(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`, {
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
          height: data.height,
          weight: data.weight,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          abilities: data.abilities.map((ability: any) => ({
            name: ability.ability.name,
          })),
          image: data.sprites.other["official-artwork"].front_default,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          types: data.types.map((type: any) => type?.type?.name),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          moves: data.moves.map((move: any) => ({
            move: { name: move.move.name },
          })),
        });
        setLoading(false);
      })
      .catch((error) => console.log("ERROR:", error));
  }, [pokemonNum]);

  useEffect(() => {
    console.log("triggered!");
    getPokemon();
  }, [getPokemon, pokemonNum]);

  // console.log("Pokemon:", pokemon);

  const value = { pokemon, isLoading, pokemonNum, setPokemonNum };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export default PokemonContext;
