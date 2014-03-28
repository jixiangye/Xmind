package com.bysj.bean;

import com.bysj.entity.Customer;

public class CustomerBean extends BaseBean {
    private Customer customer = new Customer();

    /**
     * @return 返回变量customer的值
     */
    public Customer getCustomer() {
        return customer;
    }

    /**
     * @param customer 设置customer的值
     */
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

}
