package com.andreacatapano.finalproject.final_project_back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.service.CharacteristicsService;

@RestController
@RequestMapping("/api/characteristics")
@CrossOrigin
public class CharacteristicRestController {

    @Autowired
    CharacteristicsService characteristicsService;

    @GetMapping
    public List<Characteristic> index() {
        return characteristicsService.findAll();
    }
}