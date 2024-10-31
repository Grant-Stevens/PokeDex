/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import apiClient from "@/helpers/api_client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IPokemonContext {
  isLoading: boolean;
  pokemon: IPokemon | undefined;
  getPokemon: (id: number | string) => void;
}

export interface IPokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: Array<{ name: string }>;
  image: string;
  types: TypeString[];
  moves: Array<IMove>;
  stats: Array<IStat>;
}

export interface IStat {
  name: StatString;
  baseValue: number;
  effortValue: number;
}

export interface IMove {
  name: string;
  type: TypeString;
  power: number;
  accuracy: number;
  pp: number;
  damageType: ["physical" | "special" | "status"];
  description: string;
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

export type TypeString = keyof typeof typeColors;

export const statStrings = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.AT",
  "special-defense": "SP.DE",
  speed: "SPD",
};

export type StatString = keyof typeof statStrings;

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
  const [pokemon, setPokemon] = useState<IPokemon | undefined>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const getPokemon = useCallback(
    async (id: number | string = 1) => {
      setLoading(true);
      try {
        const pokemonResponse = await apiClient.makeAPICall(
          `https://pokeapi.co/api/v2/pokemon/${
            typeof id === "string" ? id.toLocaleLowerCase() : id
          }`,
          { method: "GET" }
        );

        const moveset = getRandomMoveset(pokemonResponse.moves);
        const movesResponse = await apiClient.makeMultipleAPICalls(
          moveset.map((move) => ({
            url: move.url,
            options: { method: "GET" },
          }))
        );
        const moves = movesResponse.map((move) => ({
          name: move.name,
          type: move.type.name,
          power: move.power,
          accuracy: move.accuracy,
          pp: move.pp,
          damageType: move["damage_class"].name,
          description:
            move.effect_entries.find(
              (entry: any) => entry.language?.name === "en"
            )?.short_effect ??
            move.flavor_text_entries.find(
              (entry: any) =>
                entry.language?.name === "en" &&
                entry.version_group?.name === "sword-shield"
            ).flavor_text,
        }));

        const pkmn = {
          id: pokemonResponse.id,
          name: pokemonResponse.name,
          height: pokemonResponse.height,
          weight: pokemonResponse.weight,
          abilities: pokemonResponse.abilities.map((ability: any) => ({
            name: ability.ability.name,
          })),
          image:
            pokemonResponse.sprites.other["official-artwork"].front_default,
          types: pokemonResponse.types.map((type: any) => type?.type?.name),
          moves: moves,
          stats: pokemonResponse.stats.map((stat: any) => ({
            name: stat.stat.name,
            baseValue: stat["base_stat"],
            effortValue: stat.effort,
          })),
        };
        setPokemon(pkmn);
        setLoading(false);
      } catch (error) {
        console.log("ERROR:", error);
        setPokemon(undefined);
        setLoading(false);
      }
    },
    [pokemon]
  );

  const getRandomMoveset = useCallback(
    (moves: Array<{ move: { name: string; url: string } }>) => {
      const newMoveset: Array<{ name: string; url: string }> = [];
      for (let i = 0; i < 4; i++) {
        let newMove;
        do {
          newMove = moves[Math.floor(Math.random() * moves.length)].move;
        } while (newMoveset.includes(newMove));
        newMoveset.push(newMove);
      }

      return newMoveset;
    },
    []
  );

  useEffect(() => {
    getPokemon();
  }, []);

  const value = { isLoading, pokemon, getPokemon };

  console.log("pokemon:", pokemon);

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export default PokemonContext;
