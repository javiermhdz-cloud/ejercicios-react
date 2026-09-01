type GrettingsProps = {
  name: string;
  city: string;
  age: number;
  heroName: string;
  isAvenger: boolean;
}

export function Grettings({ name, city, age, heroName, isAvenger }: GrettingsProps) {
  return (
    <div className="card">
      <h1 className="card-title">Hola, soy {name}</h1>
      <p className="card-text">Vivo en {city}</p>
      <p className="card-text">Tengo {age} años</p>
      <p className="card-text">Mi nombre de héroe es {heroName}</p>
      <p className="card-text">¿Soy un Avenger?: {isAvenger ? "Sí" : "No"}</p>
    </div>
  );
}