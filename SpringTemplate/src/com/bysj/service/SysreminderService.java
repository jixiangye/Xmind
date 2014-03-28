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

import com.bysj.dao.SysreminderDao;
import com.bysj.entity.Sysreminder;
import com.bysj.utils.DateUtils;
import com.bysj.utils.StringUtils;

@Service
public class SysreminderService {
    @Autowired
    private SysreminderDao sysreminderDao;

    public List<Sysreminder> query(final Sysreminder sysreminder) {
        List<Sysreminder> list = sysreminderDao.findAll(new Specification<Sysreminder>() {

            @Override
            public Predicate toPredicate(Root<Sysreminder> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                if (!StringUtils.isEmpty(sysreminder.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(sysreminder.getBuildingName())));
                }
                if (!StringUtils.isEmpty(sysreminder.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(sysreminder.getCustName())));
                }
                if (!StringUtils.isEmpty(sysreminder.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(sysreminder.getHouseNumber())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
        for (Sysreminder sysreminder2 : list) {
            if (sysreminder2.getRedminerTime().compareTo(DateUtils.parse(DateUtils.format(new Date(), "yyyy-MM-dd"), "yyyy-MM-dd")) < 0) {
                sysreminder2.setStatus("是");
            } else {
                sysreminder2.setStatus("否");
            }
        }
        return list;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Sysreminder save(Sysreminder sysreminder) {
        return sysreminderDao.save(sysreminder);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && sysreminderDao.exists(id)) {
            sysreminderDao.delete(id);
        }
    }
}
