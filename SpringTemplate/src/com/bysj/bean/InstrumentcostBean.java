package com.bysj.bean;

import com.bysj.entity.Instrumentcost;

public class InstrumentcostBean extends BaseBean {
    private Instrumentcost instrumentcost = new Instrumentcost();

    /**
     * @return 返回变量instrumentcost的值
     */
    public Instrumentcost getInstrumentcost() {
        return instrumentcost;
    }

    /**
     * @param instrumentcost 设置instrumentcost的值
     */
    public void setInstrumentcost(Instrumentcost instrumentcost) {
        this.instrumentcost = instrumentcost;
    }

}
