package com.mind.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.BaseBean;
import com.mind.bean.ErrorBean;
import com.mind.bean.LoginBean;
import com.mind.dao.ILoginDao;
import com.mind.entity.User;
import com.mind.utils.StringUtils;

@Service
public class LoginService {
	@Autowired
	private ILoginDao loginDao;

	public LoginBean checkUsernameAndPassword(User user) {
		LoginBean loginBean = new LoginBean();
		User user2 = loginDao.findByUsernameAndPassword(user.getUsername(),
				user.getPassword());
		if (user2 == null) {
			loginBean.getErrorBeanList().add(new ErrorBean("", "用户名或密码错误"));
		} else {
			loginBean.setUser(user2);
		}
		if (loginBean.getErrorBeanList().size() > 0) {
			loginBean.setSuccess(false);
		}
		return loginBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public BaseBean register(User user) {
		BaseBean baseBean = new BaseBean();
		if (StringUtils.isEmpty(user.getUsername())) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "用户名不能为空"));
		} else if (user.getUsername().toCharArray().length > 20) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "用户名长度最大值为20"));
		}
		if (StringUtils.isEmpty(user.getPassword())) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "密码不能为空"));
		} else if (user.getPassword().toCharArray().length > 20) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "密码长度最大值为20"));
		}
		if (StringUtils.isEmpty(user.getEmail())) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "邮箱不能为空"));
		} else if (user.getEmail().toCharArray().length > 50) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "邮箱长度最大值为50"));
		}
		if (loginDao.findByUsername(user.getUsername()).size() > 0) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "该用户名已被注册"));
		}
		if (loginDao.findByEmail(user.getEmail()).size() > 0) {
			baseBean.getErrorBeanList().add(new ErrorBean("", "该邮箱已被注册"));
		}
		if (baseBean.getErrorBeanList().size() > 0) {
			baseBean.setSuccess(false);
		} else {
			loginDao.save(user);
		}
		return baseBean;
	}
}
