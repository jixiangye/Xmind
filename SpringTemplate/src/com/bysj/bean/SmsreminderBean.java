package com.bysj.bean;

import com.bysj.entity.Smsreminder;

public class SmsreminderBean extends BaseBean {
    private Smsreminder smsreminder = new Smsreminder();

    /**
     * @return 返回变量smsreminder的值
     */
    public Smsreminder getSmsreminder() {
        return smsreminder;
    }

    /**
     * @param smsreminder 设置smsreminder的值
     */
    public void setSmsreminder(Smsreminder smsreminder) {
        this.smsreminder = smsreminder;
    }

}
