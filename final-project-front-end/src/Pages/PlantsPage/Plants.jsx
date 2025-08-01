import axios from "axios";
import { useState, useEffect } from "react";
import PlantCard from "../../Components/PlantCard/Card.jsx";
import "./Plants.css";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:8080/api/plants";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        setPlants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Errore:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Errore: {error}</div>;

  return (
    <div className="plants-page">
      <div className="plants-container">
        <h1 className="plants-title">Le Nostre Piante</h1>
        <div className="plants-grid">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plants;
