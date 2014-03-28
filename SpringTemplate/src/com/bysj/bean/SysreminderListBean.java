package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Sysreminder;

public class SysreminderListBean extends BaseBean {
    private List<Sysreminder> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Sysreminder> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Sysreminder> list) {
        this.list = list;
    }

}
