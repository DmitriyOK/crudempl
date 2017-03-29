package ru.petshop.company.dao;

import ru.petshop.company.model.Department;
import ru.petshop.company.model.Employer;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public interface EmployerDao {

    Employer create(Employer department);
    Employer update(Employer department);
    Employer findOne(int id);
    void delete(int id);
    List<Employer> findAll();

}
