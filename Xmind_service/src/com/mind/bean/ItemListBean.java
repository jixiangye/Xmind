package com.mind.bean;

import java.util.ArrayList;
import java.util.List;

public class ItemListBean<T> extends BaseBean {
	private static final long serialVersionUID = 1L;

	private List<T> list = new ArrayList<>();

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

}
