package ru.petshop.company.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Dmitriy on 30.03.2017.
 */

@Controller
public class MainController {
    @RequestMapping(value = "/")
    public String indexPage(){
        return "index";
    }
}
