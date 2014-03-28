package com.bysj.bean;

import com.bysj.entity.Sysreminder;

public class SysreminderBean extends BaseBean {
    private Sysreminder sysreminder = new Sysreminder();

    /**
     * @return 返回变量sysreminder的值
     */
    public Sysreminder getSysreminder() {
        return sysreminder;
    }

    /**
     * @param sysreminder 设置sysreminder的值
     */
    public void setSysreminder(Sysreminder sysreminder) {
        this.sysreminder = sysreminder;
    }

}
