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

import com.bysj.bean.SmsreminderBean;
import com.bysj.bean.SmsreminderListBean;
import com.bysj.entity.Smsreminder;
import com.bysj.service.SmsreminderService;
import com.bysj.utils.DateUtils;
import com.bysj.utils.ExcelUtils;
import com.bysj.utils.StringUtils;

@Controller
@RequestMapping("/smsreminder")
public class SmsreminderController {
    @Autowired
    private SmsreminderService smsreminderService;

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @ResponseBody
    public SmsreminderListBean query(@RequestBody Smsreminder smsreminder) {
        SmsreminderListBean smsreminderListBean = new SmsreminderListBean();
        List<Smsreminder> list = smsreminderService.query(smsreminder);
        smsreminderListBean.setList(list);
        return smsreminderListBean;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public SmsreminderBean save(@RequestBody Smsreminder smsreminder) {
        SmsreminderBean smsreminderBean = new SmsreminderBean();
        smsreminderBean.setSmsreminder(smsreminderService.save(smsreminder));
        return smsreminderBean;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public SmsreminderBean delete(@RequestBody Smsreminder smsreminder) {
        smsreminderService.delete(smsreminder.getId());
        return new SmsreminderBean();
    }

    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> export(Smsreminder smsreminder) {
        List<List<String>> contents = new ArrayList<List<String>>();
        List<Smsreminder> list = smsreminderService.query(smsreminder);
        for (int i = 0, len = list.size(); i < len; i++) {
            List<String> strs = new ArrayList<String>();
            Smsreminder entity = list.get(i);
            strs.add(entity.getBuildingName());
            strs.add(entity.getHouseNumber());
            strs.add(entity.getCustName());
            strs.add(StringUtils.checkNull(entity.getOwePrice()));
            strs.add(DateUtils.format(entity.getDeadline(), "yyyy-MM-dd"));
            strs.add(entity.getPhone());
            contents.add(strs);
        }
        return ExcelUtils.export("短信提醒.xls", new String[] { "楼宇名称", "门牌号", "业主姓名", "欠费金额", "缴费限期", "手机号" }, contents);
    }
}
