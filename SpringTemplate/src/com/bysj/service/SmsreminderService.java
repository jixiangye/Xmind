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

import com.bysj.dao.SmsreminderDao;
import com.bysj.entity.Smsreminder;
import com.bysj.utils.StringUtils;

@Service
public class SmsreminderService {
    @Autowired
    private SmsreminderDao smsreminderDao;

    public List<Smsreminder> query(final Smsreminder smsreminder) {
        return smsreminderDao.findAll(new Specification<Smsreminder>() {

            @Override
            public Predicate toPredicate(Root<Smsreminder> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                if (!StringUtils.isEmpty(smsreminder.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(smsreminder.getBuildingName())));
                }
                if (!StringUtils.isEmpty(smsreminder.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(smsreminder.getCustName())));
                }
                if (!StringUtils.isEmpty(smsreminder.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(smsreminder.getHouseNumber())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Smsreminder save(Smsreminder smsreminder) {
        return smsreminderDao.save(smsreminder);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && smsreminderDao.exists(id)) {
            smsreminderDao.delete(id);
        }
    }
}
