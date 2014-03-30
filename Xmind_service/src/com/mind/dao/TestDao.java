package com.mind.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import com.mind.entity.Country;

public interface TestDao extends Repository<Country, String> {
	Page<Country> findAll(Pageable pageable);
}
