package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Chargedetail;

public interface ChargedetailDao extends Repository<Chargedetail, Integer> {
    public List<Chargedetail> findAll(Specification<Chargedetail> spec);

    Chargedetail save(Chargedetail entity);

    void delete(Integer id);

    boolean exists(Integer id);
}
