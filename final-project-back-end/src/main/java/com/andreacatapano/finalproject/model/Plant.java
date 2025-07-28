package com.andreacatapano.finalproject.model;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "piante")
public class Plant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(name = "slug")
    @Size(max = 100)
    private String slug;

    @NotBlank
    @Column(name = "nome")
    @Size(max = 100)
    private String name;

    @NotBlank
    @Column(name = "nome_scientifico")
    @Size(max = 150)
    private String scientificName;

    @NotNull
    @DecimalMin("0.01")
    @Column(name = "prezzo", nullable = false)
    private BigDecimal price;

    @Column(name = "descrizione")
    private String description;

    @Column(name = "immagine_url")
    @Size(max = 255)
    private String imageURL;

    @Column(name = "altezza_max")
    @Size(max = 50)
    private String maximumHeight;

    public Plant() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getMaximumHeight() {
        return maximumHeight;
    }

    public void setMaximumHeight(String maximumHeight) {
        this.maximumHeight = maximumHeight;
    }

}
