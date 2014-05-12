package com.mind.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.ErrorBean;
import com.mind.bean.ItemListBean;
import com.mind.bean.TagBean;
import com.mind.bean.TagNotesRelationBean;
import com.mind.dao.ITagDao;
import com.mind.dao.ITagNotesRelationDao;
import com.mind.entity.Tag;
import com.mind.entity.TagNotesRelation;

@Service
public class TagService {
	@Autowired
	private ITagDao tagDao;

	@Autowired
	private ITagNotesRelationDao tagNotesRelationDao;

	public ItemListBean<Tag> query(HttpSession session) {
		ItemListBean<Tag> tagList = new ItemListBean<>();
		if (session.getAttribute("id") == null) {
			tagList.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
		} else {
			List<Tag> list = tagDao.findByUserId((Integer) session
					.getAttribute("id"));
			tagList.setList(list);
		}
		return tagList;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public TagBean save(Tag tag, HttpSession session) {
		TagBean tagBean = new TagBean();
		if (session.getAttribute("id") == null) {
			tagBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
		} else {
			tag.setUserId((Integer) session.getAttribute("id"));
			tag = tagDao.save(tag);
			tagBean.setTagId(tag.getTagId());
		}
		return tagBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void delete(Integer tagId) {
		tagDao.delete(tagId);
		tagNotesRelationDao.delete(tagNotesRelationDao.findByTagId(tagId));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public TagNotesRelationBean saveRelation(
			TagNotesRelationBean tagNotesRelationBean) {
		TagNotesRelation tagNotesRelation = new TagNotesRelation();
		tagNotesRelation.setNotesId(tagNotesRelationBean.getNotesId());
		tagNotesRelation.setTagId(tagNotesRelationBean.getTagId());
		tagNotesRelation = tagNotesRelationDao.save(tagNotesRelation);
		tagNotesRelationBean.setTagNotesRelationId(tagNotesRelation
				.getTagNotesRelationId());
		tagNotesRelationBean.setTagName(tagDao.findByTagId(
				tagNotesRelationBean.getTagId()).getTagName());
		return tagNotesRelationBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void deleteRelation(TagNotesRelation tagNotesRelation) {
		tagNotesRelation = tagNotesRelationDao.findByNotesIdAndTagId(
				tagNotesRelation.getNotesId(), tagNotesRelation.getTagId());
		if (tagNotesRelation != null) {
			tagNotesRelationDao
					.delete(tagNotesRelation.getTagNotesRelationId());
		}
	}
}
