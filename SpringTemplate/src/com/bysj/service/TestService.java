package com.bysj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bysj.dao.TestDao;
import com.bysj.entity.Customer;

@Service
public class TestService {
    @Autowired
    private TestDao testDao;

    public List<Customer> findAll() {
        return testDao.findAll();
    }
}
