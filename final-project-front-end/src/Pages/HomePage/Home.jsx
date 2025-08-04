import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomePlantCard from "../../Components/PlantCard/Card";
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
          <div className="loading">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="homepage-container">
          <div className="error-section">
            <h2>Qualcosa è andato storto</h2>
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
        {/* Hero Section - Layout asimmetrico */}
        <section className="hero-section">
          <div className="section-header">
            <div>
              <h1 className="section-title">Consigliati per Te</h1>
            </div>
            <div>
              <p className="section-subtitle">
                Piante selezionate per trasformare i tuoi spazi in oasi verdi.
              </p>
            </div>
          </div>

          <div className="recommended-grid">
            {recommendedPlants.map((plant) => (
              <HomePlantCard key={plant.id} plant={plant} variant="hero" />
            ))}
          </div>

          <div className="section-action">
            <Link to="/plants" className="cta-button">
              Vedi tutte le piante
            </Link>
          </div>
        </section>

        {/* Category Carousel Section - Enhanced */}
        {categoryPlants.length > 0 && (
          <section className="carousel-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  {selectedCategory?.name || "Selezione Speciale"}
                </h2>
              </div>
              <div>
                <p className="section-subtitle">
                  Una collezione curata per ogni occasione
                </p>
              </div>
            </div>

            <div className="carousel-container">
              <div className="carousel-wrapper">
                <div
                  className="carousel-track"
                  style={{
                    transform: `translateX(-${carouselIndex * 100}%)`,
                  }}
                >
                  {categoryPlants.map((plant) => (
                    <div key={plant.id} className="carousel-slide">
                      <HomePlantCard plant={plant} variant="carousel" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="carousel-navigation">
                <div className="carousel-controls">
                  <button
                    className="carousel-button"
                    onClick={prevSlide}
                    disabled={categoryPlants.length <= 1}
                    aria-label="Pianta precedente"
                  >
                    ←
                  </button>
                  <button
                    className="carousel-button"
                    onClick={nextSlide}
                    disabled={categoryPlants.length <= 1}
                    aria-label="Pianta successiva"
                  >
                    →
                  </button>
                </div>

                {/* Indicators */}
                {categoryPlants.length > 1 && (
                  <div className="carousel-indicators">
                    {categoryPlants.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${
                          index === carouselIndex ? "active" : ""
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Vai alla pianta ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Cheap Plants Section - Layout offset */}
        <section className="cheap-section">
          <div className="section-header">
            <h2 className="section-title">Prezzi Convenienti</h2>
            <p className="section-subtitle">
              Qualità eccezionale a prezzi accessibili
            </p>
          </div>

          <div className="cheap-grid">
            {cheapPlants.map((plant) => (
              <HomePlantCard key={plant.id} plant={plant} variant="cheap" />
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
