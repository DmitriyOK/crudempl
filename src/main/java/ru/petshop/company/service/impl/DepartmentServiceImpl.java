package ru.petshop.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public Integer create(Department department) {
        return departmentDao.create(department);
    }

    @Transactional
    public Integer update(Department department) {
        return departmentDao.update(department);
    }

    public Department findOne(int id) {
        return departmentDao.findOne(id);
    }

    @Transactional
    public void delete(int id) {
        departmentDao.delete(id);
    }

    public List<Department> findAll() {
        return departmentDao.findAll();
    }
}
