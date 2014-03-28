package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Smsreminder;

public interface SmsreminderDao extends Repository<Smsreminder, Integer> {
    public List<Smsreminder> findAll(Specification<Smsreminder> spec);

    Smsreminder save(Smsreminder entity);

    void delete(Integer id);

    boolean exists(Integer id);
}
