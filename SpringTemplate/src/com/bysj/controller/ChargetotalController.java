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

import com.bysj.bean.ChargetotalBean;
import com.bysj.bean.ChargetotalListBean;
import com.bysj.entity.Chargetotal;
import com.bysj.service.ChargetotalService;
import com.bysj.utils.DateUtils;
import com.bysj.utils.ExcelUtils;
import com.bysj.utils.StringUtils;

@Controller
@RequestMapping("/chargetotal")
public class ChargetotalController {
    @Autowired
    private ChargetotalService chargetotalService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public ChargetotalListBean query(@RequestBody Chargetotal chargetotal) {
        ChargetotalListBean chargetotalListBean = new ChargetotalListBean();
        List<Chargetotal> list = chargetotalService.query(chargetotal);
        chargetotalListBean.setList(list);
        return chargetotalListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ChargetotalBean save(@RequestBody Chargetotal chargetotal) {
        ChargetotalBean chargetotalBean = new ChargetotalBean();
        chargetotalBean.setChargetotal(chargetotalService.save(chargetotal));
        return chargetotalBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ChargetotalBean delete(@RequestBody Chargetotal chargetotal) {
        chargetotalService.delete(chargetotal.getId());
        return new ChargetotalBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Chargetotal chargetotal) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Chargetotal> list = chargetotalService.query(chargetotal);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Chargetotal entity = list.get(i);
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(StringUtils.checkNull(entity.getTotalPrice()));
            strs.add(StringUtils.checkNull(entity.getBasicTotalPrice()));
            strs.add(StringUtils.checkNull(entity.getInstrumentTotalPrice()));
            strs.add("0".equals(entity.getStatus()) ? "是" : "否");
            strs.add(DateUtils.format(entity.getDeadline(), "yyyy-MM-dd"));
            contents.add(strs);
        }
        return ExcelUtils.export("合计收费.xls", new String[] { "楼宇名称", "门牌号", "业主姓名", "应缴费用合计", "基本物业费", "仪表物业费", "是否已缴清", "缴费限期" }, contents);
    }
    
}
