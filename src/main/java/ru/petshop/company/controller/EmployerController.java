package ru.petshop.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.petshop.company.model.Employer;
import ru.petshop.company.service.EmployerService;

import java.util.List;


@Controller
@RequestMapping("api")
public class EmployerController {

    @Autowired
    EmployerService employerService;

    @ResponseBody
    @RequestMapping(value = "employer/find/{id}")
    public Employer findEmployer(@PathVariable("id") int employerId){
        return employerService.findOne(employerId);
    }


    @ResponseBody
    @RequestMapping(value = "employer/create", method = RequestMethod.POST)
    public Integer create(@RequestBody Employer employer){
        return employerService.create(employer);
    }

    @ResponseBody
    @RequestMapping(value = "employer/update", method = RequestMethod.POST)
    public Integer update(@RequestBody Employer employer){
        return employerService.update(employer);
    }

    @ResponseBody
    @RequestMapping(value = "employer/delete/{id}", method = RequestMethod.GET)
    public void delete(@PathVariable("id") int id){
        employerService.delete(id);
    }

    @ResponseBody
    @RequestMapping(value = "employer/find", method = RequestMethod.GET)
    public List<Employer> findAll(){
        return employerService.findAll();
    }

}
