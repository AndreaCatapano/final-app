import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

function PlantSearch({ onResults, onLoading, onError }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [characteristicsLoaded, setCharacteristicsLoaded] = useState(false);

  const baseUrl = "http://localhost:8080/api";

  useEffect(() => {
    loadCharacteristics();
  }, []);

  const loadCharacteristics = async () => {
    try {
      const response = await axios.get(`${baseUrl}/characteristics`);

      console.log("Caratteristiche ricevute:", response.data);

      if (Array.isArray(response.data)) {
        setCharacteristics(response.data);
        setCharacteristicsLoaded(true);
      } else {
        console.error("Le caratteristiche non sono un array:", response.data);
        setCharacteristics([]);
        setCharacteristicsLoaded(false);
      }
    } catch (error) {
      console.error("Errore nel caricamento delle caratteristiche:", error);
      console.log(
        "Filtro per caratteristiche disabilitato - controlla l'endpoint /api/characteristics"
      );
      setCharacteristics([]);
      setCharacteristicsLoaded(false);
    }
  };

  // Funzione per eseguire la ricerca per nome (parziale)
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    setIsSearching(true);
    onLoading(true);

    try {
      console.log("Cercando piante che contengono:", searchTerm.trim());
      const response = await axios.get(
        `${baseUrl}/plants/search/${encodeURIComponent(searchTerm.trim())}`
      );
      console.log("Risposta ricerca:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        onResults(response.data);
        onError(null);
      } else if (Array.isArray(response.data) && response.data.length === 0) {
        console.log("Array vuoto - nessuna pianta trovata");
        onResults([]);
        onError(`Nessuna pianta trovata che contenga "${searchTerm}"`);
      } else {
        console.log("Risposta non è un array valido");
        onResults([]);
        onError(`Errore nei dati ricevuti per "${searchTerm}"`);
      }
    } catch (error) {
      console.error("Errore nella ricerca:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      onResults([]);
      if (error.response?.status === 404) {
        onError(`Nessuna pianta trovata che contenga "${searchTerm}"`);
      } else {
        onError(
          `Errore durante la ricerca: ${
            error.response?.status || "Errore di rete"
          }`
        );
      }
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  };

  const handleSort = async (order) => {
    setSortOrder(order);
    onLoading(true);

    try {
      let endpoint = `${baseUrl}/plants`;

      if (order === "asc") {
        endpoint = `${baseUrl}/plants/name/asc`;
      } else if (order === "desc") {
        endpoint = `${baseUrl}/plants/name/desc`;
      }

      console.log("Ordinamento endpoint:", endpoint);
      const response = await axios.get(endpoint);
      onResults(response.data);
      onError(null);
    } catch (error) {
      console.error("Errore nell'ordinamento:", error);
      onError("Errore durante l'ordinamento");
    } finally {
      onLoading(false);
    }
  };

  const handleCharacteristicFilter = async (characteristicId) => {
    setSelectedCharacteristic(characteristicId);
    onLoading(true);

    try {
      let endpoint = `${baseUrl}/plants`;

      if (characteristicId) {
        endpoint = `${baseUrl}/plants/characteristic/${characteristicId}`;
      }

      console.log("Filtro caratteristica endpoint:", endpoint);
      const response = await axios.get(endpoint);
      onResults(response.data);
      onError(null);
    } catch (error) {
      console.error("Errore nel filtro per caratteristiche:", error);
      onError("Errore durante il filtro");
    } finally {
      onLoading(false);
    }
  };

  const handleReset = async () => {
    setSearchTerm("");
    setSortOrder("default");
    setSelectedCharacteristic("");
    onLoading(true);

    try {
      const response = await axios.get(`${baseUrl}/plants`);
      onResults(response.data);
      onError(null);
    } catch (error) {
      console.error("Errore nel reset:", error);
      onError("Errore durante il reset");
    } finally {
      onLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="plant-search">
      <div className="plant-search-container">
        {/* Sezione Ricerca per Nome */}
        <div className="search-section">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Cerca piante che contengono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
              disabled={isSearching}
            />
            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
              className="search-button"
            >
              {isSearching ? "Cercando..." : "Cerca"}
            </button>
          </div>

          {/* Indicatore filtri attivi */}
          {(sortOrder !== "default" || selectedCharacteristic) && (
            <div className="active-filters">
              <span className="active-filters-label">Filtri attivi:</span>

              {sortOrder !== "default" && (
                <span className="active-filter">
                  Ordine: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </span>
              )}

              {selectedCharacteristic && (
                <span className="active-filter">
                  Caratteristica:{" "}
                  {characteristics.find(
                    (c) => c.id.toString() === selectedCharacteristic
                  )?.name || "Sconosciuta"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sezione Filtri */}
        <div className="filters-section">
          {/* Ordinamento per Nome */}
          <div className="filter-group">
            <label htmlFor="sort-select">Ordina per nome:</label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              className="filter-select"
            >
              <option value="default">Ordine predefinito</option>
              <option value="asc">A-Z (Crescente)</option>
              <option value="desc">Z-A (Decrescente)</option>
            </select>
          </div>

          {/* Filtro per Caratteristiche - Solo se caricate correttamente */}
          {characteristicsLoaded && characteristics.length > 0 && (
            <div className="filter-group">
              <label htmlFor="characteristic-select">
                Filtra per caratteristica:
              </label>
              <select
                id="characteristic-select"
                value={selectedCharacteristic}
                onChange={(e) => handleCharacteristicFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Tutte le caratteristiche</option>
                {characteristics.map((characteristic) => (
                  <option key={characteristic.id} value={characteristic.id}>
                    {characteristic.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reset Filtri */}
          <div className="filter-group">
            <button onClick={handleReset} className="reset-button">
              Reset Filtri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantSearch;
