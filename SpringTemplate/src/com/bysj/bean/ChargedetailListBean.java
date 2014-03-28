package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Chargedetail;

public class ChargedetailListBean extends BaseBean {
    private List<Chargedetail> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Chargedetail> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Chargedetail> list) {
        this.list = list;
    }

}
