package com.bysj.bean;

import com.bysj.entity.Chargedetail;

public class ChargedetailBean extends BaseBean {
    private Chargedetail chargedetail = new Chargedetail();

    /**
     * @return 返回变量chargedetail的值
     */
    public Chargedetail getChargedetail() {
        return chargedetail;
    }

    /**
     * @param chargedetail 设置chargedetail的值
     */
    public void setChargedetail(Chargedetail chargedetail) {
        this.chargedetail = chargedetail;
    }

}
