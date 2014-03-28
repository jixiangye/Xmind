package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Basiccost;

public class BasiccostListBean extends BaseBean {
    private List<Basiccost> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Basiccost> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Basiccost> list) {
        this.list = list;
    }

}
