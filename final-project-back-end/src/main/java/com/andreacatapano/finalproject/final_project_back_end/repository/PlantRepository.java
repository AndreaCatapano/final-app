package com.andreacatapano.finalproject.final_project_back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;

public interface PlantRepository extends JpaRepository<Plant, Integer> {

    Plant findBySlug(String slug);

    Plant findByName(String name);

    List<Plant> findByNameContainingIgnoreCase(String name);

    List<Plant> findAllByOrderByNameAsc();

    List<Plant> findAllByOrderByNameDesc();

    List<Plant> findByCharacteristics(Characteristic characteristic);

}
