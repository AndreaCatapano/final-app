package com.andreacatapano.finalproject.final_project_back_end.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andreacatapano.finalproject.final_project_back_end.model.Characteristic;
import com.andreacatapano.finalproject.final_project_back_end.service.CharacteristicsService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

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

    @GetMapping("{id}")
    public String show(@PathVariable Integer id, Model model) {

        Optional<Characteristic> characteristicAttempt = characteristicsService.findById(id);

        if (characteristicAttempt.isEmpty()) {
            return "redirect:/characteristics";
        }
        Characteristic characteristic = characteristicAttempt.get();
        model.addAttribute("characteristic", characteristic);

        return "characteristics/show";
    }

    @GetMapping("create")
    public String getCreate(Model model) {
        model.addAttribute("characteristic", new Characteristic());
        return "characteristics/create";
    }

    @PostMapping("create")
    public String create(@Valid @ModelAttribute("characteristic") Characteristic formCharacteristic,
            BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("characteristic", formCharacteristic);
            return "/characteristics/create";
        }

        characteristicsService.ceate(formCharacteristic);

        return "redirect:/characteristics";
    }

    @GetMapping("update/{id}")
    public String getUpdate(@PathVariable Integer id, Model model) {
        Optional<Characteristic> characteristicAttempt = characteristicsService.findById(id);

        if (characteristicAttempt.isEmpty()) {
            return "redirect:/characteristics";
        }

        Characteristic characteristic = characteristicAttempt.get();

        model.addAttribute("characteristic", characteristic);
        return "characteristics/update";
    }

    @PostMapping("update/{id}")
    public String postMethodName(@Valid @ModelAttribute("characteristic") Characteristic formCharacteristic,
            BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("characteristics", formCharacteristic);
            return "/plants/create";
        }

        characteristicsService.update(formCharacteristic);

        return "redirect:/characteristics";
    }

    @PostMapping("delete/{id}")
    public String delete(@PathVariable Integer id, Model model) {
        Optional<Characteristic> characteristicAttempt = characteristicsService.findById(id);

        if (characteristicAttempt.isEmpty()) {
            System.out.println("L'elemento non è stato trovato o è stato già cancellato ");
            return "redirect:/characteristics";
        }

        Characteristic characteristic = characteristicAttempt.get();
        characteristicsService.delete(characteristic);
        return "redirect:/characteristics";
    }

}
