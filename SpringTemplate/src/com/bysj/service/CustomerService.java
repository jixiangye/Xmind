package com.bysj.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bysj.dao.CustomerDao;
import com.bysj.dao.HouseinfoDao;
import com.bysj.entity.Customer;
import com.bysj.entity.Houseinfo;
import com.bysj.utils.StringUtils;

@Service
public class CustomerService {
    @Autowired
    private CustomerDao  customerDao;

    @Autowired
    private HouseinfoDao houseinfoDao;

    public List<Customer> query(final Customer customer) {
        return customerDao.findAll(new Specification<Customer>() {

            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                if (!StringUtils.isEmpty(customer.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(customer.getBuildingName())));
                }
                if (!StringUtils.isEmpty(customer.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(customer.getCustName())));
                }
                if (!StringUtils.isEmpty(customer.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(customer.getHouseNumber())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Customer save(Customer customer) {
        List<Houseinfo> list = houseinfoDao.findByCustId(customer.getId());
        for (Houseinfo houseinfo : list) {
            houseinfo.setCustName(customer.getCustName());
        }
        houseinfoDao.save(list);
        return customerDao.save(customer);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && customerDao.exists(id)) {
            customerDao.delete(id);
        }
    }
}
