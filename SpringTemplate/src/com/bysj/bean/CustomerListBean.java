package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

import com.bysj.entity.Customer;

public class CustomerListBean extends BaseBean {
    private List<Customer> list = new ArrayList<>();

    /**
     * @return 返回变量list的值
     */
    public List<Customer> getList() {
        return list;
    }

    /**
     * @param list 设置list的值
     */
    public void setList(List<Customer> list) {
        this.list = list;
    }

}
