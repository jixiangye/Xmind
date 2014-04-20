package com.mind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.BaseBean;
import com.mind.bean.ItemListBean;
import com.mind.entity.Tag;
import com.mind.entity.TagNotesRelation;
import com.mind.service.TagService;

@Controller
@RequestMapping("/tag")
public class TagController {
	@Autowired
	private TagService tagService;

	@RequestMapping(value = "/query", method = RequestMethod.POST)
	@ResponseBody
	public ItemListBean<Tag> query() {
		return tagService.query();
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean save(@RequestBody Tag tag) {
		tagService.save(tag);
		return new BaseBean();
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean delete(@RequestBody Tag tag) {
		tagService.delete(tag.getTagName());
		return new BaseBean();
	}

	@RequestMapping(value = "/saveRelation", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean saveRelation(@RequestBody TagNotesRelation tagNotesRelation) {
		tagService.saveRelation(tagNotesRelation);
		return new BaseBean();
	}

	@RequestMapping(value = "/deleteRelation", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean deleteRelation(
			@RequestBody TagNotesRelation tagNotesRelation) {
		tagService.deleteRelation(tagNotesRelation);
		return new BaseBean();
	}
}
