package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Customer;

public interface CustomerDao extends Repository<Customer, Integer> {
    public List<Customer> findAll(Specification<Customer> spec);

    Customer save(Customer entity);

    void delete(Integer id);

    boolean exists(Integer id);

}
