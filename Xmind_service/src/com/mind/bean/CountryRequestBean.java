package com.mind.bean;

import java.io.Serializable;

public class CountryRequestBean implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer pageNum;

	private Integer pageSize;

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

}
