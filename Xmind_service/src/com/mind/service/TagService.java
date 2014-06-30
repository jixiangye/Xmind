package com.mind.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.BaseBean;
import com.mind.bean.ErrorBean;
import com.mind.bean.TagNotesRelationBean;
import com.mind.dao.ITagDao;
import com.mind.dao.ITagNotesRelationDao;
import com.mind.entity.Tag;
import com.mind.entity.TagNotesRelation;

@Service
public class TagService {
    @Autowired
    private ITagDao              tagDao;

    @Autowired
    private ITagNotesRelationDao tagNotesRelationDao;

    public BaseBean query(HttpSession session) {
        BaseBean baseBean = new BaseBean();
        if (session.getAttribute("id") == null) {
            baseBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
        } else {
            List<Tag> list = tagDao.findByUserId((Integer) session.getAttribute("id"));
            baseBean.getResult().put("list", list);
        }
        return baseBean;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public BaseBean save(Tag tag, HttpSession session) {
        BaseBean baseBean = new BaseBean();
        if (session.getAttribute("id") == null) {
            baseBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
        } else {
            tag.setUserId((Integer) session.getAttribute("id"));
            tag = tagDao.save(tag);
            baseBean.getResult().put("tagId", tag.getTagId());
        }
        return baseBean;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer tagId) {
        tagDao.delete(tagId);
        tagNotesRelationDao.delete(tagNotesRelationDao.findByTagId(tagId));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public BaseBean saveRelation(TagNotesRelationBean tagNotesRelationBean) {
        BaseBean baseBean = new BaseBean();
        TagNotesRelation tagNotesRelation = new TagNotesRelation();
        tagNotesRelation.setNotesId(tagNotesRelationBean.getNotesId());
        tagNotesRelation.setTagId(tagNotesRelationBean.getTagId());
        tagNotesRelation = tagNotesRelationDao.save(tagNotesRelation);
        baseBean.getResult().put("tagNotesRelationId", tagNotesRelation.getTagNotesRelationId());
        baseBean.getResult().put("tagName", tagDao.findByTagId(tagNotesRelationBean.getTagId()).getTagName());
        return baseBean;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void deleteRelation(TagNotesRelation tagNotesRelation) {
        tagNotesRelation = tagNotesRelationDao.findByNotesIdAndTagId(tagNotesRelation.getNotesId(), tagNotesRelation.getTagId());
        if (tagNotesRelation != null) {
            tagNotesRelationDao.delete(tagNotesRelation.getTagNotesRelationId());
        }
    }
}
