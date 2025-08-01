import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlantCard from "../../Components/PlantCard/Card";
import "./Home.css";

function Homepage() {
  const [recommendedPlants, setRecommendedPlants] = useState([]);
  const [categoryPlants, setCategoryPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cheapPlants, setCheapPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const baseUrl = "http://localhost:8080/api";

  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    setLoading(true);
    try {
      const plantsResponse = await axios.get(`${baseUrl}/plants`);
      const allPlants = plantsResponse.data;

      if (!Array.isArray(allPlants) || allPlants.length === 0) {
        setError("Nessuna pianta disponibile");
        return;
      }

      const shuffled = [...allPlants].sort(() => 0.5 - Math.random());
      setRecommendedPlants(shuffled.slice(0, 3));

      try {
        const characteristicsResponse = await axios.get(
          `${baseUrl}/characteristics`
        );
        if (
          Array.isArray(characteristicsResponse.data) &&
          characteristicsResponse.data.length > 0
        ) {
          const randomCharacteristic =
            characteristicsResponse.data[
              Math.floor(Math.random() * characteristicsResponse.data.length)
            ];
          setSelectedCategory(randomCharacteristic);

          const categoryResponse = await axios.get(
            `${baseUrl}/plants/characteristic/${randomCharacteristic.id}`
          );
          setCategoryPlants(
            Array.isArray(categoryResponse.data) ? categoryResponse.data : []
          );
        }
      } catch (characteristicError) {
        console.log(
          "Caratteristiche non disponibili, uso piante casuali per il carosello"
        );
        setCategoryPlants(shuffled.slice(3, 9));
        setSelectedCategory({ name: "Selezione Speciale" });
      }

      const sortedByPrice = [...allPlants].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      setCheapPlants(sortedByPrice.slice(0, 6));
    } catch (error) {
      console.error("Errore nel caricamento della homepage:", error);
      setError("Errore nel caricamento dei dati");
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (categoryPlants.length > 0) {
      setCarouselIndex((prevIndex) =>
        prevIndex === categoryPlants.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (categoryPlants.length > 0) {
      setCarouselIndex((prevIndex) =>
        prevIndex === 0 ? categoryPlants.length - 1 : prevIndex - 1
      );
    }
  };

  const goToSlide = (index) => {
    setCarouselIndex(index);
  };

  if (loading) {
    return (
      <div className="homepage">
        <div className="homepage-container">
          <div className="loading">Caricamento homepage...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="homepage-container">
          <div className="error-section">
            <h2>Errore</h2>
            <p>{error}</p>
            <Link to="/plants" className="cta-button">
              Vai alle piante
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="homepage-container">
        {/* Hero Section - Consigliati per te */}
        <section className="hero-section">
          <div className="section-header">
            <h1 className="section-title">Consigliati per Te</h1>
            <p className="section-subtitle">
              Scopri le nostre piante selezionate
            </p>
          </div>

          <div className="recommended-grid">
            {recommendedPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="section-action">
            <Link to="/plants" className="cta-button">
              Vedi tutte le piante
            </Link>
          </div>
        </section>

        {/* Category Carousel Section */}
        {categoryPlants.length > 0 && (
          <section className="carousel-section">
            <div className="section-header">
              <h2 className="section-title">
                {selectedCategory?.name || "Selezione Speciale"}
              </h2>
              <p className="section-subtitle">Scorri per vedere di più</p>
            </div>

            <div className="carousel-container">
              <button
                className="carousel-button prev"
                onClick={prevSlide}
                disabled={categoryPlants.length <= 1}
              >
                ←
              </button>

              <div className="carousel-wrapper">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {categoryPlants.map((plant) => (
                    <div key={plant.id} className="carousel-slide">
                      <PlantCard plant={plant} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="carousel-button next"
                onClick={nextSlide}
                disabled={categoryPlants.length <= 1}
              >
                →
              </button>
            </div>

            {/* Carousel Indicators */}
            {categoryPlants.length > 1 && (
              <div className="carousel-indicators">
                {categoryPlants.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${
                      index === carouselIndex ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Cheap Plants Section */}
        <section className="cheap-section">
          <div className="section-header">
            <h2 className="section-title">Prezzi Convenienti</h2>
            <p className="section-subtitle">Le 6 piante più economiche</p>
          </div>

          <div className="cheap-grid">
            {cheapPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="section-action">
            <Link to="/plants" className="cta-button">
              Scopri altre offerte
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
