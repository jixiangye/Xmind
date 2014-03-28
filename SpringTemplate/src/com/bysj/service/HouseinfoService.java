package com.bysj.service;

import java.util.ArrayList;
import java.util.Date;
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
public class HouseinfoService {
    @Autowired
    private HouseinfoDao houseinfoDao;

    @Autowired
    private CustomerDao  customerDao;

    public List<Houseinfo> query(final Houseinfo houseinfo) {
        return houseinfoDao.findAll(new Specification<Houseinfo>() {

            @Override
            public Predicate toPredicate(Root<Houseinfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> status = root.get("status");
                if (!StringUtils.isEmpty(houseinfo.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(houseinfo.getBuildingName())));
                }
                if (!StringUtils.isEmpty(houseinfo.getCustName())) {
                    predicates.add(cb.equal(status, StringUtils.addPercent(houseinfo.getCustName())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Houseinfo save(Houseinfo houseinfo) {
        return houseinfoDao.save(houseinfo);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && houseinfoDao.exists(id)) {
            houseinfoDao.delete(id);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void checkIn(Customer customer) {
        Integer id = customer.getId();
        customer.setId(null);
        if (customer.getCheckinTime() == null) {
            customer.setCheckinTime(new Date());
        }
        customer = customerDao.save(customer);

        Houseinfo house = houseinfoDao.findOne(id);
        house.setCustName(customer.getCustName());
        house.setCustId(customer.getId());
        houseinfoDao.save(house);
    }
}
