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

import com.bysj.dao.ChargetotalDao;
import com.bysj.entity.Chargetotal;
import com.bysj.utils.StringUtils;

@Service
public class ChargetotalService {
    @Autowired
    private ChargetotalDao chargetotalDao;

    public List<Chargetotal> query(final Chargetotal chargedetail) {
        return chargetotalDao.findAll(new Specification<Chargetotal>() {

            @Override
            public Predicate toPredicate(Root<Chargetotal> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                Path<String> status = root.get("status");
                Path<Date> deadline = root.get("deadline");
                if (!StringUtils.isEmpty(chargedetail.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(chargedetail.getBuildingName())));
                }
                if (!StringUtils.isEmpty(chargedetail.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(chargedetail.getCustName())));
                }
                if (!StringUtils.isEmpty(chargedetail.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(chargedetail.getHouseNumber())));
                }
                if (!StringUtils.isEmpty(chargedetail.getStatus())) {
                    predicates.add(cb.equal(status, chargedetail.getStatus()));
                }
                if (chargedetail.getDeadline() != null) {
                    predicates.add(cb.equal(deadline, chargedetail.getDeadline()));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Chargetotal save(Chargetotal chargedetail) {
        chargedetail.setTotalPrice(chargedetail.getBasicTotalPrice().add(chargedetail.getInstrumentTotalPrice()));
        chargedetail.setStatus("1");
        return chargetotalDao.save(chargedetail);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && chargetotalDao.exists(id)) {
            chargetotalDao.delete(id);
        }
    }
}
