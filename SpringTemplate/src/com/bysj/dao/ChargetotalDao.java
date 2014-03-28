package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Chargetotal;

public interface ChargetotalDao extends Repository<Chargetotal, Integer> {
    public List<Chargetotal> findAll(Specification<Chargetotal> spec);

    Chargetotal save(Chargetotal entity);

    void delete(Integer id);

    boolean exists(Integer id);

    Chargetotal findOne(Integer id);
}
