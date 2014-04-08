package com.mind.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class BaseBean implements Serializable {
	private static final long serialVersionUID = 1L;

	private boolean success = true;

	private List<ErrorBean> errorBeanList = new ArrayList<>();

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<ErrorBean> getErrorBeanList() {
		return errorBeanList;
	}

}
