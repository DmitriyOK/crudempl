package ru.petshop.company.dao;

import ru.petshop.company.model.Department;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public interface DepartmentDao {

    Department create(Department department);
    Department save(Department department);
    Department findOne(int id);
    void delete(int id);
    List<Department> findAll();


}
