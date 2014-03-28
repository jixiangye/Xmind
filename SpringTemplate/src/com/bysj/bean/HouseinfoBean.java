package com.bysj.bean;

import com.bysj.entity.Houseinfo;

public class HouseinfoBean extends BaseBean {
    private Houseinfo houseinfo = new Houseinfo();

    /**
     * @return 返回变量houseinfo的值
     */
    public Houseinfo getHouseinfo() {
        return houseinfo;
    }

    /**
     * @param houseinfo 设置houseinfo的值
     */
    public void setHouseinfo(Houseinfo houseinfo) {
        this.houseinfo = houseinfo;
    }

}
