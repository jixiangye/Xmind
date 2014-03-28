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

import com.bysj.bean.SysreminderBean;
import com.bysj.bean.SysreminderListBean;
import com.bysj.entity.Sysreminder;
import com.bysj.service.SysreminderService;
import com.bysj.utils.DateUtils;
import com.bysj.utils.ExcelUtils;
import com.bysj.utils.StringUtils;

@Controller
@RequestMapping("/sysreminder")
public class SysreminderController {
    @Autowired
    private SysreminderService sysreminderService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public SysreminderListBean query(@RequestBody Sysreminder sysreminder) {
        SysreminderListBean sysreminderListBean = new SysreminderListBean();
        List<Sysreminder> list = sysreminderService.query(sysreminder);
        sysreminderListBean.setList(list);
        return sysreminderListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public SysreminderBean save(@RequestBody Sysreminder sysreminder) {
        SysreminderBean sysreminderBean = new SysreminderBean();
        sysreminderBean.setSysreminder(sysreminderService.save(sysreminder));
        return sysreminderBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public SysreminderBean delete(@RequestBody Sysreminder sysreminder) {
        sysreminderService.delete(sysreminder.getId());
        return new SysreminderBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Sysreminder sysreminder) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Sysreminder> list = sysreminderService.query(sysreminder);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Sysreminder entity = list.get(i);
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(StringUtils.checkNull(entity.getOwePrice()));
            strs.add(DateUtils.format(entity.getDeadline(), "yyyy-MM-dd"));
            strs.add(DateUtils.format(entity.getRedminerTime(), "yyyy-MM-dd"));
            strs.add(entity.getRedminerContent());
            strs.add(entity.getStatus());
            contents.add(strs);
        }
        return ExcelUtils.export("系统提醒.xls", new String[] { "楼宇名称", "门牌号", "业主姓名", "欠费金额", "缴费限期", "提醒时间", "提醒内容", "是否已提醒" }, contents);
    }
}
