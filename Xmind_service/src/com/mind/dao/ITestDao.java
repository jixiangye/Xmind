package com.mind.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.Country;

public interface ITestDao extends Repository<Country, String> {
	@Transactional(propagation = Propagation.SUPPORTS)
	Page<Country> findAll(Pageable pageable);
}
