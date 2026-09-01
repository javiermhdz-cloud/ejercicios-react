import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type PokemonItem = {
  name: string;
  url: string;
};

type PokemonData = {
  id: number;
  name: string;
  image: string;
};

function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => res.json())
      .then((data) => {
        const formattedData: PokemonData[] = data.results.map((item: PokemonItem) => {
          const id = item.url.split("/").filter(Boolean).pop();
          return {
            id: Number(id),
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
        setPokemons(formattedData);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  function viewDetails(name: string) {
    alert(`Ver detalles de ${name}`);
  }

  if (loading) {
    return (
      <Stack sx={{ alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ padding: 3, maxWidth: 450, margin: "0 auto" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
        Pokémon desde PokeAPI
      </Typography>

      {pokemons.map((pokemon) => (
        <Stack
          key={pokemon.id}
          direction="row"
          spacing={2}
          sx={{
            border: "1px solid #cccccc",
            borderRadius: 2,
            padding: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={pokemon.image}
              alt={pokemon.name}
              sx={{ width: 56, height: 56, backgroundColor: "#f0f0f0" }}
            />
            <div>
              <strong style={{ textTransform: "capitalize" }}>{pokemon.name}</strong>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
                ID: #{pokemon.id}
              </p>
            </div>
          </Stack>

          <Button variant="outlined" onClick={() => viewDetails(pokemon.name)}>
            Ver
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}

export default App;