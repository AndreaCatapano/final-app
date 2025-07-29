package com.andreacatapano.finalproject.final_project_back_end.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andreacatapano.finalproject.final_project_back_end.model.Plant;
import com.andreacatapano.finalproject.final_project_back_end.model.Treatment;
import com.andreacatapano.finalproject.final_project_back_end.service.PlantService;
import com.andreacatapano.finalproject.final_project_back_end.service.TreatmentService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/treatments")
public class TreatmentController {

    @Autowired
    private TreatmentService treatmentService;

    @Autowired
    private PlantService plantService;

    @GetMapping("/create")
    public String getCreate(@RequestParam("plantslug") String plantSlug, Model model) {
        Plant plant = plantService.findBySlug(plantSlug);
        Treatment treatment = new Treatment();
        treatment.setPlant(plant);

        model.addAttribute("treatment", treatment);
        model.addAttribute("plant", plant);

        return "treatments/create";
    }

    @PostMapping("/create")
    public String create(@Valid @ModelAttribute("treatment") Treatment formTreatment,
            @RequestParam("plantslug") String plantSlug, BindingResult bindingResult,
            Model model) {

        if (bindingResult.hasErrors()) {
            Plant plant = plantService.findBySlug(plantSlug);
            model.addAttribute("plant", plant);
            return "treatments/create";
        }

        Plant plant = plantService.findBySlug(plantSlug);
        formTreatment.setPlant(plant);

        treatmentService.create(formTreatment);

        return "redirect:/plants/" + plantSlug;
    }

    @GetMapping("/update/{id}")
    public String getUpate(@PathVariable Integer id, @RequestParam("plantslug") String plantSlug, Model model) {
        Plant plant = plantService.findBySlug(plantSlug);
        Optional<Treatment> treatmentAttempt = treatmentService.findById(id);

        if (treatmentAttempt.isEmpty()) {
            model.addAttribute("plant", plant);
            return "treatments/update";
        }

        Treatment treatment = treatmentAttempt.get();

        model.addAttribute("plant", plant);
        model.addAttribute("treatment", treatment);

        return "treatments/update";
    }

    @PostMapping("/update/{id}")
    public String update(@Valid @PathVariable Integer id, @ModelAttribute("treatment") Treatment formTreatment,
            @RequestParam("plantslug") String plantSlug, BindingResult bindingResult,
            Model model) {

        Plant plant = plantService.findBySlug(plantSlug);

        if (bindingResult.hasErrors()) {
            model.addAttribute("plant", plant);
            model.addAttribute("treatment", formTreatment);
            return "treatments/update";
        }

        formTreatment.setId(id);
        formTreatment.setPlant(plant);

        treatmentService.update(formTreatment);

        return "redirect:/plants/" + plantSlug;
    }

    @PostMapping("/delete/{id}")
    public String confirmDelete(@PathVariable Integer id) {
        Treatment treatment = treatmentService.findById(id).orElseThrow();
        String plantSlug = treatment.getPlant().getSlug();

        treatmentService.deleteById(id);

        return "redirect:/plants/" + plantSlug;
    }

}
