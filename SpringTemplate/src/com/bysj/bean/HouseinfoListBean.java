package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Houseinfo;

public class HouseinfoListBean extends BaseBean {
    private List<Houseinfo> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Houseinfo> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Houseinfo> list) {
        this.list = list;
    }

}
