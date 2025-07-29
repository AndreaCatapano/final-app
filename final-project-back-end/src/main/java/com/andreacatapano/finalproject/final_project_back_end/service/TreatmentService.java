package com.andreacatapano.finalproject.final_project_back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.model.Treatment;
import com.andreacatapano.finalproject.final_project_back_end.repository.PlantRepository;
import com.andreacatapano.finalproject.final_project_back_end.repository.TreatmentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TreatmentService {

    @Autowired
    TreatmentRepository treatmentRepository;

    @Autowired
    PlantRepository plantRepository;

    public List<Treatment> findAll() {
        return treatmentRepository.findAll();
    }

    public Treatment getById(Integer id) {
        return treatmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pizza con ID " + id + " non trovata"));
    }

    public Optional<Treatment> findById(Integer id) {
        return treatmentRepository.findById(id);
    }

    public Treatment create(Treatment treatment) {
        return treatmentRepository.save(treatment);
    }

    public Treatment update(Treatment treatment) {
        return treatmentRepository.save(treatment);
    }

    public void delete(Treatment treatment) {
        treatmentRepository.delete(treatment);
    }

    public void deleteById(Integer id) {
        Treatment treatment = treatmentRepository.findById(id).orElseThrow();

        Plant plant = treatment.getPlant();
        plant.getTreatments().remove(treatment);

        treatmentRepository.deleteById(id);
    }

    public Plant getPlantBySlug(String slug) {
        return plantRepository.findBySlug(slug);
    }
}
