import axios from "axios";
import { useState, useEffect } from "react";
import PlantCard from "../../Components/PlantCard/Card";
import PlantSearch from "../../Components/PlantsSearch/Search";
import "./Plants.css";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:8080/api/plants";

  useEffect(() => {
    loadAllPlants();
  }, []);

  const loadAllPlants = () => {
    setLoading(true);
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
  };

  // Callback per gestire i risultati della ricerca
  const handleSearchResults = (results) => {
    setPlants(results);
  };

  // Callback per gestire lo stato di loading
  const handleLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // Callback per gestire gli errori
  const handleErrorState = (errorMessage) => {
    setError(errorMessage);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="plants-page">
      <div className="plants-container">
        <h1 className="plants-title">Le Nostre Piante</h1>

        <PlantSearch
          onResults={handleSearchResults}
          onLoading={handleLoadingState}
          onError={handleErrorState}
        />

        <div className="plants-results">
          <p className="results-count">
            {plants.length}{" "}
            {plants.length === 1 ? "pianta trovata" : "piante trovate"}
          </p>

          <div className="plants-grid">
            {plants.length > 0
              ? plants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))
              : !loading && (
                  <div className="no-results">
                    <p>
                      {error
                        ? error
                        : "Nessuna pianta trovata con i criteri di ricerca selezionati."}
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plants;
