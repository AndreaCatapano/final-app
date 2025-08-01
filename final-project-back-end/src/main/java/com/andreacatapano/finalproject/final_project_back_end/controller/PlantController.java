package com.andreacatapano.finalproject.final_project_back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.service.PlantService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequestMapping("/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping
    public String index(Model model) {
        List<Plant> plants = plantService.findAll();
        model.addAttribute("plants", plants);
        return "plants/index";
    }

    @GetMapping("/{slug}")
    public String show(@PathVariable String slug, Model model) {
        Plant plant = plantService.findBySlug(slug);
        if (plant != null && plant.getCharacteristics() != null) {
            plant.getCharacteristics().forEach(c -> System.out.println("Caratteristica: " + c.getName()));
        }
        model.addAttribute("plant", plant);
        return "plants/show";
    }

    @GetMapping("/create")
    public String getCreate(Model model) {
        model.addAttribute("plant", new Plant());
        return "plants/create";
    }

    @PostMapping("/create")
    public String create(@Valid @ModelAttribute("plant") Plant formPlant, BindingResult bindingResult, Model model) {

        formPlant.setSlug(plantService.generateSlug(formPlant.getName()));

        if (bindingResult.hasErrors()) {
            model.addAttribute("plant", formPlant);
            return "/plants/create";
        }

        plantService.create(formPlant);

        return "redirect:/plants";
    }

    @GetMapping("/update/{slug}")
    public String getUpdate(@PathVariable String slug, Model model) {
        Plant plant = plantService.findBySlug(slug);
        List<Characteristic> characteristics = plantService.findCharacteristics();

        if (plant != null) {
            model.addAttribute("plant", plant);
            model.addAttribute("characteristics", characteristics);
            return "plants/update";
        }

        return "redirect:/plants";
    }

    @PostMapping("/update/{slug}")
    public String update(@Valid @ModelAttribute("plant") Plant formPlant,
            BindingResult bindingResult,
            @PathVariable String slug,
            Model model) {

        if (bindingResult.hasErrors()) {
            List<Characteristic> characteristics = plantService.findCharacteristics();
            model.addAttribute("characteristics", characteristics);
            return "plants/update";
        }

        formPlant.setSlug(slug);
        plantService.update(formPlant);

        return "redirect:/plants/" + slug;
    }

    @PostMapping("/delete/{slug}")
    public String delete(@PathVariable String slug, Model model) {
        Plant plant = plantService.findBySlug(slug);
        plantService.delete(plant);
        return "redirect:/plants";
    }

}
