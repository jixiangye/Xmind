package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Instrumentcost;

public class InstrumentcostListBean extends BaseBean {
    private List<Instrumentcost> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Instrumentcost> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Instrumentcost> list) {
        this.list = list;
    }

}
