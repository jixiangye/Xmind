package com.bysj.bean;

import java.util.ArrayList;
import java.util.List;

public class BaseBean {
    private Boolean         success   = Boolean.TRUE;

    private String          token;

    private List<ErrorBean> errorList = new ArrayList<ErrorBean>();

    /**
     * @return 返回变量success的值
     */
    public Boolean getSuccess() {
        return success;
    }

    /**
     * @param success 设置success的值
     */
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    /**
     * @return 返回变量token的值
     */
    public String getToken() {
        return token;
    }

    /**
     * @param token 设置token的值
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * @return 返回变量errorList的值
     */
    public List<ErrorBean> getErrorList() {
        return errorList;
    }

    /**
     * @param errorList 设置errorList的值
     */
    public void setErrorList(List<ErrorBean> errorList) {
        this.errorList = errorList;
    }

}
