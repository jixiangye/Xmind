package com.bysj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bysj.entity.Customer;
import com.bysj.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestService testService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public List<Customer> query(@RequestBody Customer customer) {
        List<Customer> list = testService.findAll();
        return list;
    }
}
