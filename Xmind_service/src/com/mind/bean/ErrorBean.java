package com.mind.bean;

import java.io.Serializable;

public class ErrorBean implements Serializable {
    private static final long serialVersionUID = 1L;

    private String            field;

    private String            errorMessage;

    public ErrorBean(String field, String errorMessage) {
        this.field = field;
        this.errorMessage = errorMessage;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

}
