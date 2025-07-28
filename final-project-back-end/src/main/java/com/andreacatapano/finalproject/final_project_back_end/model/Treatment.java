package com.andreacatapano.finalproject.final_project_back_end.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cure")
public class Treatment implements Serializable {

    public Treatment() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(nullable = false, name = "tipo_di_trattamento")
    @Size(max = 100)
    private String typeOfTreatment;

    @NotBlank
    @Column(nullable = false, name = "frequenza")
    @Size(max = 100)
    private String frequency;

    @NotBlank
    @Column(nullable = false, name = "descrizione")
    @Size(max = 250)
    private String description;

    @Column(name = "note")
    @Size(max = 250)
    private String note;

    @NotBlank
    @Column(nullable = false, name = "periodo_dell_anno")
    @Size(max = 250)
    private String periodOfTheYear;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    @JsonBackReference
    private Plant plant;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getPeriodOfTheYear() {
        return periodOfTheYear;
    }

    public void setPeriodOfTheYear(String periodOfTheYear) {
        this.periodOfTheYear = periodOfTheYear;
    }

    public String getTypeOfTreatment() {
        return typeOfTreatment;
    }

    public void setTypeOfTreatment(String typeOfTreatment) {
        this.typeOfTreatment = typeOfTreatment;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

}
