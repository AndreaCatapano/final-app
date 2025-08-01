import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PlantDetail.css";

function PlantDetail() {
  const { slug } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "http://localhost:8080/api";

  useEffect(() => {
    loadPlantDetail();
  }, [slug]);

  const loadPlantDetail = async () => {
    if (!slug) {
      setError("Slug della pianta non trovato");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Caricando dettagli per slug:", slug);
      const response = await axios.get(`${baseUrl}/plants/slug/${slug}`);
      console.log("Dettagli pianta ricevuti:", response.data);

      if (response.data && response.data.id) {
        setPlant(response.data);
        setError(null);
      } else {
        setError("Pianta non trovata");
      }
    } catch (error) {
      console.error("Errore nel caricamento dei dettagli:", error);
      if (error.response?.status === 404) {
        setError("Pianta non trovata");
      } else {
        setError("Errore nel caricamento della pianta");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="plant-detail-page">
        <div className="plant-detail-container">
          <div className="loading">Caricamento dettagli...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plant-detail-page">
        <div className="plant-detail-container">
          <div className="error-section">
            <h2>Errore</h2>
            <p>{error}</p>
            <Link to="/plants" className="back-button">
              Torna alle piante
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="plant-detail-page">
        <div className="plant-detail-container">
          <div className="error-section">
            <h2>Pianta non trovata</h2>
            <Link to="/plants" className="back-button">
              Torna alle piante
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-detail-page">
      <div className="plant-detail-container">
        {/* Navigation */}
        <div className="plant-detail-nav">
          <Link to="/plants" className="back-button">
            ← Torna alle piante
          </Link>
        </div>

        {/* Main Content */}
        <div className="plant-detail-content">
          {/* Image Section */}
          <div className="plant-detail-image-section">
            {plant.imageURL ? (
              <img
                src={plant.imageURL}
                alt={plant.name}
                className="plant-detail-image"
              />
            ) : (
              <div className="plant-detail-image-placeholder">
                <span>Immagine non disponibile</span>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="plant-detail-info">
            {/* Header */}
            <div className="plant-detail-header">
              <h1 className="plant-detail-name">{plant.name}</h1>
              <p className="plant-detail-scientific">{plant.scientificName}</p>
              <div className="plant-detail-price">€{plant.price}</div>
            </div>

            {/* Basic Info */}
            <div className="plant-detail-section">
              <h2 className="section-title">Informazioni Generali</h2>

              {plant.maximumHeight && (
                <div className="info-row">
                  <span className="info-label">Altezza Massima:</span>
                  <span className="info-value">{plant.maximumHeight}</span>
                </div>
              )}

              {plant.description && (
                <div className="info-row full-width">
                  <span className="info-label">Descrizione:</span>
                  <p className="info-description">{plant.description}</p>
                </div>
              )}
            </div>

            {/* Characteristics */}
            {plant.characteristics && plant.characteristics.length > 0 && (
              <div className="plant-detail-section">
                <h2 className="section-title">Caratteristiche</h2>
                <div className="characteristics-grid">
                  {plant.characteristics.map((characteristic, index) => (
                    <div key={index} className="characteristic-item">
                      {characteristic.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatments */}
            {plant.treatments && plant.treatments.length > 0 && (
              <div className="plant-detail-section">
                <h2 className="section-title">Trattamenti</h2>
                <div className="treatments-list">
                  {plant.treatments.map((treatment, index) => (
                    <div key={index} className="treatment-item">
                      <h3 className="treatment-name">{treatment.name}</h3>
                      {treatment.description && (
                        <p className="treatment-description">
                          {treatment.description}
                        </p>
                      )}
                      {treatment.frequency && (
                        <div className="treatment-frequency">
                          <span className="info-label">Frequenza:</span>
                          <span className="info-value">
                            {treatment.frequency}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantDetail;
