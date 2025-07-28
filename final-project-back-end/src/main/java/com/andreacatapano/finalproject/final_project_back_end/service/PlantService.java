package com.andreacatapano.finalproject.final_project_back_end.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.repository.PlantRepository;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public List<Plant> findAll() {
        return plantRepository.findAll();
    }

    public Plant findBySlug(String slug) {
        return plantRepository.findBySlug(slug);
    }

    public Plant create(Plant plant) {
        return plantRepository.save(plant);
    }

    public Plant update(Plant plant) {
        return plantRepository.save(plant);
    }

    public void delete(Plant plant) {
        plantRepository.delete(plant);
    }

    public String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }

}
