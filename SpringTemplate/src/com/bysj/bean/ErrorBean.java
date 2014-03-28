package com.bysj.bean;

import java.io.Serializable;

public class ErrorBean implements Serializable {
    private static final long serialVersionUID = -5542497781531974550L;

    private String            field;                                   // 前台调后台接口的对应的query字段

    private String            errorCode;

    private String            errorMsg;

    private String            status;

    private Object[]          args;

    /*** ErrorBean构造函数 **/
    public ErrorBean(String errorCode) {
        super();
        this.errorMsg = errorCode;
    }

    public ErrorBean(String errorCode, Object[] args) {
        super();
        this.errorMsg = errorCode;
        this.args = args;
    }

    /*** ErrorBean构造函数 **/
    public ErrorBean() {
        super();
    }

    public String getField() {
        return field;
    }

    public ErrorBean setField(String field) {
        this.field = field;
        return this;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public ErrorBean setErrorCode(String errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public ErrorBean setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public ErrorBean setStatus(String status) {
        this.status = status;
        return this;
    }

    /**
     * @return 返回变量args的值
     */
    public Object[] getArgs() {
        return args;
    }

    /**
     * @param args 设置args的值
     */
    public void setArgs(Object[] args) {
        this.args = args;
    }
}
