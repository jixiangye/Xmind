package com.mind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

	public ItemListBean<Tag> query() {
		ItemListBean<Tag> tagList = new ItemListBean<>();
		List<Tag> list = tagDao.findAll();
		tagList.setList(list);
		return tagList;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public TagBean save(Tag tag) {
		TagBean tagBean = new TagBean();
		tag = tagDao.save(tag);
		tagBean.setTagId(tag.getTagId());
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
		Tag tag = tagDao.findByTagName(tagNotesRelationBean.getTagName());
		if (tag == null) {
			tag = new Tag();
			tag.setTagName(tagNotesRelationBean.getTagName());
			tag.setTagColor(tagNotesRelationBean.getTagColor());
			tag = tagDao.save(tag);
		}
		TagNotesRelation tagNotesRelation = tagNotesRelationDao
				.findByNotesIdAndTagTagName(tagNotesRelationBean.getNotesId(),
						tagNotesRelationBean.getTagName());
		if (tagNotesRelation == null) {
			tagNotesRelation = new TagNotesRelation();
			tagNotesRelation.setNotesId(tagNotesRelationBean.getNotesId());
			tagNotesRelation.setTagId(tag.getTagId());
			tagNotesRelation = tagNotesRelationDao.save(tagNotesRelation);
			tagNotesRelationBean.setTagNotesRelationId(tagNotesRelation
					.getTagNotesRelationId());
		}
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
