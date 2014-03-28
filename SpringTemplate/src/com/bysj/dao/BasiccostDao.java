package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Basiccost;

public interface BasiccostDao extends Repository<Basiccost, Integer> {
    public List<Basiccost> findAll(Specification<Basiccost> spec);

    Basiccost save(Basiccost entity);

    void delete(Integer id);

    boolean exists(Integer id);
}
