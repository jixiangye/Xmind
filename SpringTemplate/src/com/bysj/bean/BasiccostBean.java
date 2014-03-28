package com.bysj.bean;

import com.bysj.entity.Basiccost;

public class BasiccostBean extends BaseBean {
    private Basiccost basiccost = new Basiccost();

    /**
     * @return 返回变量basiccost的值
     */
    public Basiccost getBasiccost() {
        return basiccost;
    }

    /**
     * @param basiccost 设置basiccost的值
     */
    public void setBasiccost(Basiccost basiccost) {
        this.basiccost = basiccost;
    }

}
