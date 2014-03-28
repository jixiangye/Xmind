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

import com.bysj.bean.HouseinfoBean;
import com.bysj.bean.HouseinfoListBean;
import com.bysj.entity.Customer;
import com.bysj.entity.Houseinfo;
import com.bysj.service.HouseinfoService;
import com.bysj.utils.ExcelUtils;

@Controller
@RequestMapping("/houseinfo")
public class HouseinfoController {
    @Autowired
    private HouseinfoService houseinfoService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public HouseinfoListBean query(@RequestBody Houseinfo houseinfo) {
        HouseinfoListBean houseinfoListBean = new HouseinfoListBean();
        List<Houseinfo> list = houseinfoService.query(houseinfo);
        houseinfoListBean.setList(list);
        return houseinfoListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public HouseinfoBean save(@RequestBody Houseinfo houseinfo) {
        HouseinfoBean houseinfoBean = new HouseinfoBean();
        houseinfoBean.setHouseinfo(houseinfoService.save(houseinfo));
        return houseinfoBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public HouseinfoBean delete(@RequestBody Houseinfo houseinfo) {
        houseinfoService.delete(houseinfo.getId());
        return new HouseinfoBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Houseinfo houseinfo) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Houseinfo> list = houseinfoService.query(houseinfo);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Houseinfo entity = list.get(i);
            strs.add("0".equals(entity.getStatus()) ? "已售" : "空闲");
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(entity.getUnitNumber());
            strs.add(entity.getFloorNumber());
            strs.add(entity.getDoorModel());
            strs.add(entity.getHouseArea());
            strs.add(entity.getHouseRights());
            contents.add(strs);
        }
        return ExcelUtils.export("楼宇信息.xls", new String[] { "房屋状态", "楼宇名称", "门牌号", "业主姓名", "单元号", "楼层", "户型", "房屋面积", "产权状况" }, contents);
    }
    
    @RequestMapping(value = "/checkIn", method = RequestMethod.POST)
    @ResponseBody
    public HouseinfoBean checkIn(@RequestBody Customer customer) {
        houseinfoService.checkIn(customer);
        return new HouseinfoBean();
    }
}
