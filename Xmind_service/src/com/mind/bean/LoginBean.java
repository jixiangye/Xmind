package com.mind.bean;

import com.mind.entity.User;

public class LoginBean extends BaseBean {
	private static final long serialVersionUID = 1L;

	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
