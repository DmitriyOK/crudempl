package ru.petshop.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public Integer create(Employer employer) {
        return employerDao.create(employer);
    }

    public Employer findOne(int id) {
        return employerDao.findOne(id);
    }

    @Transactional
    public void delete(int id) {
        employerDao.delete(id);
    }

    @Transactional
    public Integer update(Employer employer) {
        return employerDao.update(employer);
    }

    public List<Employer> findAll() {
        return employerDao.findAll();
    }
}
