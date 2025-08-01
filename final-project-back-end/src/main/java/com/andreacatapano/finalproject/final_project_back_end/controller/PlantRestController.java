package com.andreacatapano.finalproject.final_project_back_end.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.service.CharacteristicsService;
import com.andreacatapano.finalproject.final_project_back_end.service.PlantService;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin
public class PlantRestController {

    @Autowired
    PlantService plantService;

    @Autowired
    CharacteristicsService characteristicsService;

    @GetMapping
    public List<Plant> index() {
        return plantService.findAll();
    }

    @GetMapping("name/asc")
    public List<Plant> indexOrderByNameAsc() {
        return plantService.finddAllNameAsc();
    }

    @GetMapping("name/desc")
    public List<Plant> indexOrderByNameDesc() {
        return plantService.finddAllNameAsc();
    }

    @GetMapping("characteristic/{id}")
    public List<Plant> indexByCharateristic(@PathVariable Integer id) {
        Optional<Characteristic> characteristicAttempt = characteristicsService.findById(id);

        if (characteristicAttempt.isEmpty()) {
            return plantService.findAll();
        }

        Characteristic characteristic = characteristicAttempt.get();
        return plantService.findByCharacteristic(characteristic);
    }

    @GetMapping("slug/{slug}")
    public Plant show(@PathVariable String slug) {
        return plantService.findBySlug(slug);
    }

    @GetMapping("name/{name}")
    public Plant SearchByName(@PathVariable String name) {
        return plantService.findByName(name);
    }

    @GetMapping("search/{searchTerm}")
    public List<Plant> searchByNameContaining(@PathVariable String searchTerm) {
        return plantService.findByNameContaining(searchTerm);
    }

}
