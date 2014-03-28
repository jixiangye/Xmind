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

import com.bysj.bean.BasiccostBean;
import com.bysj.bean.BasiccostListBean;
import com.bysj.entity.Basiccost;
import com.bysj.service.BasiccostService;
import com.bysj.utils.ExcelUtils;
import com.bysj.utils.StringUtils;

@Controller
@RequestMapping("/basiccost")
public class BasiccostController {
    @Autowired
    private BasiccostService basiccostService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public BasiccostListBean query(@RequestBody Basiccost basiccost) {
        BasiccostListBean basiccostListBean = new BasiccostListBean();
        List<Basiccost> list = basiccostService.query(basiccost);
        basiccostListBean.setList(list);
        return basiccostListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public BasiccostBean save(@RequestBody Basiccost basiccost) {
        BasiccostBean basiccostBean = new BasiccostBean();
        basiccostBean.setBasiccost(basiccostService.save(basiccost));
        return basiccostBean;

    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public BasiccostBean delete(@RequestBody Basiccost basiccost) {
        basiccostService.delete(basiccost.getId());
        return new BasiccostBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Basiccost basiccost) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Basiccost> list = basiccostService.query(basiccost);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Basiccost entity = list.get(i);
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(entity.getHouseArea());
            strs.add(StringUtils.checkNull(entity.getCleanPrice()));
            strs.add(StringUtils.checkNull(entity.getCleanTotalPrice()));
            strs.add(StringUtils.checkNull(entity.getSecurityPrice()));
            strs.add(StringUtils.checkNull(entity.getSecurityTotalPrice()));
            strs.add(StringUtils.checkNull(entity.getBasicTotalPrice()));
            contents.add(strs);
        }
        return ExcelUtils.export("基本类物业费.xls", new String[] { "楼宇名称", "门牌号", "业主姓名", "房屋面积", "卫生费单价", "卫生费", "治安费单价", "治安费", "基本物业费合计" }, contents);
    }
}
