package ru.petshop.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.petshop.company.dao.DepartmentDao;
import ru.petshop.company.model.Department;
import ru.petshop.company.service.DepartmentService;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentDao departmentDao;

    @Override
    public Department create(Department department) {
        return departmentDao.create(department);
    }

    @Override
    public Department update(Department department) {
        return departmentDao.save(department);
    }

    @Override
    public Department findOne(int id) {
        return departmentDao.findOne(id);
    }

    @Override
    public void delete(int id) {
        departmentDao.delete(id);
    }

    @Override
    public List<Department> findAll() {
        return departmentDao.findAll();
    }
}
