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

import com.bysj.dao.InstrumentcostDao;
import com.bysj.entity.Instrumentcost;
import com.bysj.utils.StringUtils;

@Service
public class InstrumentcostService {
    @Autowired
    private InstrumentcostDao instrumentcostDao;

    public List<Instrumentcost> query(final Instrumentcost instrumentcost) {
        return instrumentcostDao.findAll(new Specification<Instrumentcost>() {

            @Override
            public Predicate toPredicate(Root<Instrumentcost> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                Path<String> buildingName = root.get("buildingName");
                Path<String> custName = root.get("custName");
                Path<String> houseNumber = root.get("houseNumber");
                if (!StringUtils.isEmpty(instrumentcost.getBuildingName())) {
                    predicates.add(cb.like(buildingName, StringUtils.addPercent(instrumentcost.getBuildingName())));
                }
                if (!StringUtils.isEmpty(instrumentcost.getCustName())) {
                    predicates.add(cb.like(custName, StringUtils.addPercent(instrumentcost.getCustName())));
                }
                if (!StringUtils.isEmpty(instrumentcost.getHouseNumber())) {
                    predicates.add(cb.like(houseNumber, StringUtils.addPercent(instrumentcost.getHouseNumber())));
                }
                if (predicates.size() > 0) {
                    return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                }
                return cb.conjunction();
            }
        });
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Instrumentcost save(Instrumentcost instrumentcost) {
        BigDecimal waterPrice = instrumentcost.getWaterPrice().multiply(
                BigDecimal.valueOf(instrumentcost.getPrivateWaterAmount() + instrumentcost.getPublicWaterAmount()));
        BigDecimal elecPrice = instrumentcost.getWaterPrice().multiply(
                BigDecimal.valueOf(instrumentcost.getPrivateElectriAmount() + instrumentcost.getPublicElectriAmount()));
        instrumentcost.setInstrumentTotalPrice(waterPrice.add(elecPrice));
        return instrumentcostDao.save(instrumentcost);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer id) {
        if (id != null && instrumentcostDao.exists(id)) {
            instrumentcostDao.delete(id);
        }
    }
}
