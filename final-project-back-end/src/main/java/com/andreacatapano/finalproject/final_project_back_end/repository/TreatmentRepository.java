package com.andreacatapano.finalproject.final_project_back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andreacatapano.finalproject.final_project_back_end.model.Treatment;
import java.util.Optional;

public interface TreatmentRepository extends JpaRepository<Treatment, Integer> {

    Optional<Treatment> findById(Integer id);

}
