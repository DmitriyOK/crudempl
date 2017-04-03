package ru.petshop.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.petshop.company.dao.EmployerDao;
import ru.petshop.company.model.Employer;
import ru.petshop.company.service.EmployerService;

import java.util.List;

/**
 * Created by Dmitriy on 29.03.2017.
 */
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    EmployerDao employerDao;

    @Override
    public Integer create(Employer employer) {
        return employerDao.create(employer);
    }

    @Override
    public Employer findOne(int id) {
        return employerDao.findOne(id);
    }

    @Override
    public void delete(int id) {
        employerDao.delete(id);
    }

    @Override
    public Integer update(Employer employer) {
        return employerDao.update(employer);
    }

    @Override
    public List<Employer> findAll() {
        return employerDao.findAll();
    }
}
