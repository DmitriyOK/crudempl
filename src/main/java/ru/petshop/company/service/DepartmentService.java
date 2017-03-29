package ru.petshop.company.service;

import ru.petshop.company.model.Department;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public interface DepartmentService {

    Department create(Department department);
    Department update(Department department);
    Department findOne(int id);
    void delete(int id);
    List<Department> findAll();


}
