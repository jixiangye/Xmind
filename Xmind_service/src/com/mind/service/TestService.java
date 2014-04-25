package com.mind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mind.bean.CountryRequestBean;
import com.mind.dao.ITestDao;
import com.mind.entity.Country;

@Service
public class TestService {
	@Autowired
	private ITestDao testDao;

	public List<Country> findAll(CountryRequestBean countryRequestBean) {
		Pageable pageable = new PageRequest(countryRequestBean.getPageNum(),
				countryRequestBean.getPageSize());
		Page<Country> result = testDao.findAll(pageable);
		return result.getContent();
	}
}
