package com.bysj.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bysj.bean.CustomerBean;
import com.bysj.bean.CustomerListBean;
import com.bysj.entity.Customer;
import com.bysj.service.CustomerService;
import com.bysj.utils.DateUtils;
import com.bysj.utils.ExcelUtils;

@Controller
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public CustomerListBean query(@RequestBody Customer customer) {
        CustomerListBean customerListBean = new CustomerListBean();
        List<Customer> list = customerService.query(customer);
        customerListBean.setList(list);
        return customerListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public CustomerBean save(@RequestBody Customer customer) {
        CustomerBean customerBean = new CustomerBean();
        customerBean.setCustomer(customerService.save(customer));
        return customerBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public CustomerBean delete(@RequestBody Customer customer) {
        customerService.delete(customer.getId());
        return new CustomerBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Customer customer) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Customer> list = customerService.query(customer);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Customer entity = list.get(i);
            strs.add(entity.getCustName());
            strs.add(entity.getIdNumber());
            strs.add(entity.getPhone());
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(DateUtils.format(entity.getCheckinTime(), "yyyy-MM-dd"));
            contents.add(strs);
        }
        return ExcelUtils.export("业主信息.xls", new String[] { "业主姓名", "身份证号", "联系电话", "楼宇名称", "门牌编号", "入住时间" }, contents);
    }
}
