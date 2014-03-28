package com.bysj.dao;

import java.util.List;

import org.springframework.data.repository.Repository;

import com.bysj.entity.Customer;

public interface TestDao extends Repository<Customer, Integer> {
    List<Customer> findAll();
}
