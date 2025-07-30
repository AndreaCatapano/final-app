package com.andreacatapano.finalproject.final_project_back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andreacatapano.finalproject.final_project_back_end.service.CharacteristicsService;

import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequestMapping("/characteristics")
public class CharacteristicController {

    @Autowired
    CharacteristicsService characteristicsService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("characteristics", characteristicsService.findAll());
        return "characteristics/index";
    }

}
