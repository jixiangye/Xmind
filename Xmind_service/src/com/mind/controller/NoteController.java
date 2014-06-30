package com.mind.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.BaseBean;
import com.mind.bean.ErrorBean;
import com.mind.bean.NoteBean;
import com.mind.service.NoteService;

@Controller
@RequestMapping("/note")
public class NoteController {
	@Autowired
	private NoteService noteService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public NoteBean save(@RequestBody NoteBean noteBean, HttpSession session) {
		try {
			noteBean = noteService.save(noteBean, session);
		} catch (Exception e) {
			noteBean.setSuccess(false);
			noteBean.getErrorBeanList().add(new ErrorBean("", "保存失败"));
		}
		return noteBean;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public NoteBean delete(@RequestBody NoteBean noteBean) {
		try {
			noteService.delete(noteBean.getNotesId());
		} catch (Exception e) {
			noteBean.setSuccess(false);
			noteBean.getErrorBeanList().add(new ErrorBean("", "删除失败"));
		}
		return noteBean;
	}

	@RequestMapping(value = "/getNotes", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean getNotes(@RequestBody NoteBean noteBean, HttpSession session) {
	    BaseBean baseBean = new BaseBean();
		try {
		    baseBean = noteService.getNotes(session);
		} catch (Exception e) {
		    baseBean.setSuccess(false);
		    baseBean.getErrorBeanList().add(new ErrorBean("", "查询失败"));
		}
		return baseBean;
	}

	@RequestMapping(value = "/getNotesHistory", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean getNotesHistory(@RequestBody NoteBean noteBean) {
	    BaseBean baseBean = new BaseBean();
		try {
		    baseBean = noteService.getNotesHistory(noteBean);
		} catch (Exception e) {
		    baseBean.setSuccess(false);
		    baseBean.getErrorBeanList().add(new ErrorBean("", "查询失败"));
		}
		return baseBean;
	}
}
