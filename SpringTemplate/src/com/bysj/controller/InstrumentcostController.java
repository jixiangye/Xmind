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

import com.bysj.bean.InstrumentcostBean;
import com.bysj.bean.InstrumentcostListBean;
import com.bysj.entity.Instrumentcost;
import com.bysj.service.InstrumentcostService;
import com.bysj.utils.ExcelUtils;
import com.bysj.utils.StringUtils;

@Controller
@RequestMapping("/instrumentcost")
public class InstrumentcostController {
    @Autowired
    private InstrumentcostService instrumentcostService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public InstrumentcostListBean query(@RequestBody Instrumentcost instrumentcost) {
        InstrumentcostListBean instrumentcostListBean = new InstrumentcostListBean();
        List<Instrumentcost> list = instrumentcostService.query(instrumentcost);
        instrumentcostListBean.setList(list);
        return instrumentcostListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public InstrumentcostBean save(@RequestBody Instrumentcost instrumentcost) {
        InstrumentcostBean instrumentcostBean = new InstrumentcostBean();
        instrumentcostBean.setInstrumentcost(instrumentcostService.save(instrumentcost));
        return instrumentcostBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public InstrumentcostBean delete(@RequestBody Instrumentcost instrumentcost) {
        instrumentcostService.delete(instrumentcost.getId());
        return new InstrumentcostBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Instrumentcost instrumentcost) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Instrumentcost> list = instrumentcostService.query(instrumentcost);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Instrumentcost entity = list.get(i);
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(StringUtils.checkNull(entity.getElectriPrice()));
            strs.add(StringUtils.checkNull(entity.getPublicElectriAmount()));
            strs.add(StringUtils.checkNull(entity.getPrivateElectriAmount()));
            strs.add(StringUtils.checkNull(entity.getWaterPrice()));
            strs.add(StringUtils.checkNull(entity.getPublicWaterAmount()));
            strs.add(StringUtils.checkNull(entity.getPrivateWaterAmount()));
            strs.add(StringUtils.checkNull(entity.getInstrumentTotalPrice()));
            contents.add(strs);
        }
        return ExcelUtils.export("仪表类物业费.xls", new String[] { "楼宇名称", "门牌号", "业主姓名", "电单价", "公用电度费", "自用电度费", "水单价", "公用水吨数", "自用水吨数", "仪表类物业费合计" },
                contents);
    }
}
