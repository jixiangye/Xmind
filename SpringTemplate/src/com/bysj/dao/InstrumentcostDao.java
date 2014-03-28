package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Instrumentcost;

public interface InstrumentcostDao extends Repository<Instrumentcost, Integer> {
    public List<Instrumentcost> findAll(Specification<Instrumentcost> spec);

    Instrumentcost save(Instrumentcost entity);

    void delete(Integer id);

    boolean exists(Integer id);
}
