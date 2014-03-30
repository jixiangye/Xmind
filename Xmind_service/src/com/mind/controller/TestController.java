package com.mind.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.CountryRequestBean;
import com.mind.entity.Country;
import com.mind.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
	@Autowired
	private TestService testService;

	@RequestMapping(value = "/getAllCountries", method = RequestMethod.POST)
	@ResponseBody
	public List<Country> getAllCountries(
			@RequestBody CountryRequestBean countryRequestBean) {
		List<Country> list = testService.findAll(countryRequestBean);
		return list;
	}
}
