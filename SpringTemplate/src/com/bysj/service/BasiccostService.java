package com.bysj.service;

import java.math.BigDecimal;
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

import com.bysj.dao.BasiccostDao;
import com.bysj.entity.Basiccost;
import com.bysj.utils.StringUtils;

@Service
public class BasiccostService {
    @Autowired
    private BasiccostDao basiccostDao;

    public List<Basiccost> query(final Basiccost basiccost) {
        return basiccostDao.findAll(new Specification<Basiccost>() {

            @Override
            public Predicate toPredicate(Root<Basiccost> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                if (!StringUtils.isEmpty(basiccost.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(basiccost.getBuildingName())));
                }
                if (!StringUtils.isEmpty(basiccost.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(basiccost.getCustName())));
                }
                if (!StringUtils.isEmpty(basiccost.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(basiccost.getHouseNumber())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });

    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Basiccost save(Basiccost basiccost) {
        basiccost.setSecurityTotalPrice(basiccost.getSecurityPrice().multiply(BigDecimal.valueOf(Long.valueOf(basiccost.getHouseArea()))));
        basiccost.setCleanTotalPrice(basiccost.getCleanPrice().multiply(BigDecimal.valueOf(Long.valueOf(basiccost.getHouseArea()))));
        basiccost.setBasicTotalPrice(basiccost.getSecurityTotalPrice().add(basiccost.getCleanTotalPrice()));
        return basiccostDao.save(basiccost);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && basiccostDao.exists(id)) {
            basiccostDao.delete(id);
        }
    }
}
