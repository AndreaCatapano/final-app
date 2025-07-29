package com.andreacatapano.finalproject.final_project_back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;

public interface CharacteristicRepository extends JpaRepository<Characteristic, Integer> {

}
