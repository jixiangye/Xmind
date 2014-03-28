package com.bysj.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.Repository;

import com.bysj.entity.Sysreminder;

public interface SysreminderDao extends Repository<Sysreminder, Integer> {
    public List<Sysreminder> findAll(Specification<Sysreminder> spec);

    Sysreminder save(Sysreminder entity);

    void delete(Integer id);

    boolean exists(Integer id);
}
