package ru.petshop.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.petshop.company.service.DepartmentService;
import ru.petshop.company.service.EmployerService;


@Controller
public class MainController {

    @Autowired
    EmployerService employerService;

    @Autowired
    DepartmentService departmentService;

    @ResponseBody
    @RequestMapping(value = "index")
    public String main(){
        return employerService.findOne(1).toString();
    }
}
