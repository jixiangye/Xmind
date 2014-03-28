package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Smsreminder;

public class SmsreminderListBean extends BaseBean {
    private List<Smsreminder> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Smsreminder> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Smsreminder> list) {
        this.list = list;
    }

}
