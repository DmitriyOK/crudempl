package ru.petshop.company.service;

import ru.petshop.company.model.Employer;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public interface EmployerService {

    Employer create(Employer employer);
    Employer findOne(int id);
    Employer update(Employer employer);
    void delete(int id);
    List<Employer> findAll();

}
