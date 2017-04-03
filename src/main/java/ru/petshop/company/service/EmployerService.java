package ru.petshop.company.service;

import ru.petshop.company.model.Employer;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public interface EmployerService {

    Integer create(Employer employer);
    Integer update(Employer employer);
    Employer findOne(int id);
    void delete(int id);
    List<Employer> findAll();

}
