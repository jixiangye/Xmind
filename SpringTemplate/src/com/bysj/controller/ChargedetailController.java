package com.bysj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bysj.bean.ChargedetailBean;
import com.bysj.bean.ChargedetailListBean;
import com.bysj.entity.Chargedetail;
import com.bysj.service.ChargedetailService;

@Controller
@RequestMapping("/chargedetail")
public class ChargedetailController {
    @Autowired
    private ChargedetailService chargedetailService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public ChargedetailListBean query(@RequestBody Chargedetail chargedetail) {
        ChargedetailListBean chargedetailListBean = new ChargedetailListBean();
        List<Chargedetail> list = chargedetailService.query(chargedetail);
        chargedetailListBean.setList(list);
        return chargedetailListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ChargedetailBean save(@RequestBody Chargedetail chargedetail) {
        ChargedetailBean chargedetailBean = new ChargedetailBean();
        chargedetailBean.setChargedetail(chargedetailService.save(chargedetail));
        return chargedetailBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ChargedetailBean delete(@RequestBody Chargedetail chargedetail) {
        chargedetailService.delete(chargedetail.getId());
        return new ChargedetailBean();
    }
}
