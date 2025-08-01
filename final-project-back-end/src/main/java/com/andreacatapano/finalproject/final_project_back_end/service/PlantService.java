package com.andreacatapano.finalproject.final_project_back_end.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.repository.CharacteristicRepository;
import com.andreacatapano.finalproject.final_project_back_end.repository.PlantRepository;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private CharacteristicRepository characteristicRepository;

    public List<Plant> findAll() {
        return plantRepository.findAll();
    }

    public List<Plant> finddAllNameAsc() {
        return plantRepository.findAllByOrderByNameAsc();
    }

    public List<Plant> finddAllNameADesc() {
        return plantRepository.findAllByOrderByNameDesc();
    }

    public List<Plant> findByCharacteristic(Characteristic characteristic) {
        return plantRepository.findByCharacteristics(characteristic);
    }

    public Plant findBySlug(String slug) {
        return plantRepository.findBySlug(slug);
    }

    public Plant findByName(String name) {
        return plantRepository.findByName(name);
    }

    public List<Plant> findByNameContaining(String name) {
        return plantRepository.findByNameContainingIgnoreCase(name);
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

    public List<Characteristic> findCharacteristics() {
        return characteristicRepository.findAll();
    }

    public String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }

}
