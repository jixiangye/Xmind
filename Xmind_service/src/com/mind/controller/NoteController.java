package com.mind.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
			noteBean = noteService.save(noteBean,session);
		} catch (Exception e) {
			noteBean.setSuccess(false);
			noteBean.getErrorBeanList().add(new ErrorBean("", "保存失败"));
		}
		return noteBean;
	}
	
	@RequestMapping(value = "/getNotes", method = RequestMethod.POST)
	@ResponseBody
	public NoteBean getNotes(@RequestBody NoteBean noteBean, HttpSession session) {
		try {
			noteBean = noteService.getNotes(session);
		} catch (Exception e) {
			noteBean.setSuccess(false);
			noteBean.getErrorBeanList().add(new ErrorBean("", "查询失败"));
		}
		return noteBean;
	}
	
	@RequestMapping(value = "/getNotesHistory", method = RequestMethod.POST)
	@ResponseBody
	public NoteBean getNotesHistory(@RequestBody NoteBean noteBean, HttpSession session) {
		try {
			noteBean = noteService.getNotesHistory(noteBean);
		} catch (Exception e) {
			noteBean.setSuccess(false);
			noteBean.getErrorBeanList().add(new ErrorBean("", "查询失败"));
		}
		return noteBean;
	}
}
