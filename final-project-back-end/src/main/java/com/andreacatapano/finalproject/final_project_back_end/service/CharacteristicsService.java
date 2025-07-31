package com.andreacatapano.finalproject.final_project_back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.repository.CharacteristicRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CharacteristicsService {

    @Autowired
    CharacteristicRepository characteristicRepository;

    public List<Characteristic> findAll() {
        return characteristicRepository.findAll();
    }

    public Optional<Characteristic> findById(Integer id) {
        return characteristicRepository.findById(id);
    }

    public Characteristic getById(Integer id) {
        return characteristicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Caratteristica con ID " + id + " non trovata"));
    }

    public Characteristic ceate(Characteristic characteristic) {
        return characteristicRepository.save(characteristic);
    }

    public Characteristic update(Characteristic characteristic) {
        return characteristicRepository.save(characteristic);
    }

    public void delete(Characteristic characteristic) {
        characteristicRepository.delete(characteristic);
    }

    public void deleteById(Integer id) {
        Optional<Characteristic> characteristicAttempt = characteristicRepository.findById(id);
        Characteristic characteristic = characteristicAttempt.get();
        characteristicRepository.delete(characteristic);
    }
}
