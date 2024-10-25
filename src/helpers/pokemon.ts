export function getRandomMoveset(moves: {move: {name: string}}[]): string[] {
  const moveset: string[] = [];
  for (let i = 0; i < 4; i++) {
    let newMove;
    do {
      newMove = moves[Math.floor((Math.random()*moves.length))].move.name;
    } while (moveset.includes(newMove))
    moveset.push(newMove);
  }
  
  return moveset;
}