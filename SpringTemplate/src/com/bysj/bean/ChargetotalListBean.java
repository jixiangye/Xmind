package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Chargetotal;

public class ChargetotalListBean extends BaseBean {
    private List<Chargetotal> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Chargetotal> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Chargetotal> list) {
        this.list = list;
    }

}
