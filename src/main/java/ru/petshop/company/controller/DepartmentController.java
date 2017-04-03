package ru.petshop.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.petshop.company.model.Department;
import ru.petshop.company.service.DepartmentService;

import java.util.List;

/**
 * Created by Dmitriy on 30.03.2017.
 */

@Controller
@RequestMapping("api")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;


    @ResponseBody
    @RequestMapping(value = "department/find/{id}", method = RequestMethod.GET)
    public Department findOne(@PathVariable("id") int id){
        return departmentService.findOne(id);
    }

    @ResponseBody
    @RequestMapping(value = "department/create", method = RequestMethod.POST)
    public Integer create(@RequestBody Department department){

        System.out.println(department);
        return departmentService.create(department);
    }

    @ResponseBody
    @RequestMapping(value = "department/update", method = RequestMethod.POST)
    public Integer update(@RequestBody Department department){
        return departmentService.update(department);
    }

    @ResponseBody
    @RequestMapping(value = "department/delete/{id}", method = RequestMethod.GET)
    public void delete(@PathVariable("id") int id){
        departmentService.delete(id);
    }

    @ResponseBody
    @RequestMapping(value = "department/find", method = RequestMethod.GET)
    public List<Department> findAll(){
       return departmentService.findAll();
    }

}
