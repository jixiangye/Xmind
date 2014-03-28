package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Houseinfo;

public interface HouseinfoDao extends Repository<Houseinfo, Integer> {
    List<Houseinfo> findByCustId(Integer id);

    List<Houseinfo> findAll(Specification<Houseinfo> spec);

    Houseinfo save(Houseinfo entity);

    Iterable<Houseinfo> save(Iterable<Houseinfo> entities);

    void delete(Integer id);

    boolean exists(Integer id);

    Houseinfo findOne(Integer id);
}
