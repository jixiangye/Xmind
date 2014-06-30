package com.mind.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.BaseBean;
import com.mind.bean.TagNotesRelationBean;
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
    public BaseBean query(HttpSession session) {
        return tagService.query(session);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public BaseBean save(@RequestBody Tag tag, HttpSession session) {
        return tagService.save(tag, session);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public BaseBean delete(@RequestBody Tag tag) {
        tagService.delete(tag.getTagId());
        return new BaseBean();
    }

    @RequestMapping(value = "/saveRelation", method = RequestMethod.POST)
    @ResponseBody
    public BaseBean saveRelation(@RequestBody TagNotesRelationBean tagNotesRelationBean) {
        return tagService.saveRelation(tagNotesRelationBean);
    }

    @RequestMapping(value = "/deleteRelation", method = RequestMethod.POST)
    @ResponseBody
    public BaseBean deleteRelation(@RequestBody TagNotesRelation tagNotesRelation) {
        tagService.deleteRelation(tagNotesRelation);
        return new BaseBean();
    }
}
