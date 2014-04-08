package com.mind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.BaseBean;
import com.mind.bean.ErrorBean;
import com.mind.entity.User;
import com.mind.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController {
	@Autowired
	private LoginService loginService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean login(@RequestBody User user) {
		BaseBean baseBean = new BaseBean();
		try {
			baseBean = loginService.checkUsernameAndPassword(user);
		} catch (Exception e) {
			baseBean.setSuccess(false);
			baseBean.getErrorBeanList().add(new ErrorBean("", "登录失败"));
		}
		return baseBean;
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean register(@RequestBody User user) {
		BaseBean baseBean = new BaseBean();
		try {
			baseBean = loginService.register(user);
		} catch (Exception e) {
			baseBean.setSuccess(false);
			baseBean.getErrorBeanList().add(new ErrorBean("", "注册失败"));
		}
		return baseBean;
	}
}
