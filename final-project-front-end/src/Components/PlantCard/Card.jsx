import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <div className="plant-card-image">
        {plant.imageURL ? (
          <img src={plant.imageURL} alt={plant.name} />
        ) : (
          <div className="plant-card-placeholder">
            <span>Immagine non disponibile</span>
          </div>
        )}
      </div>

      <div className="plant-card-content">
        <div className="plant-card-header">
          <h3 className="plant-card-name">{plant.name}</h3>
          <p className="plant-card-scientific">{plant.scientificName}</p>
        </div>

        <div className="plant-card-details">
          {plant.maximumHeight && (
            <div className="plant-card-height">
              <span>Altezza max: {plant.maximumHeight}</span>
            </div>
          )}

          {plant.description && (
            <p className="plant-card-description">
              {plant.description.length > 100
                ? plant.description.substring(0, 100) + "..."
                : plant.description}
            </p>
          )}
        </div>

        <div className="plant-card-footer">
          <div className="plant-card-price">
            <span>€{plant.price}</span>
          </div>

          <Link to={`/plants/${plant.slug}`} className="plant-card-link">
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;
