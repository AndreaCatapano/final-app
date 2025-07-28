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

}
