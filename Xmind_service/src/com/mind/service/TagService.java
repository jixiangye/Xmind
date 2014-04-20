package com.mind.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.ItemListBean;
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
	public void save(Tag tag) {
		tag = tagDao.save(tag);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void delete(String tagName) {
		tagDao.delete(tagName);
		tagNotesRelationDao.delete(tagNotesRelationDao.findByTagName(tagName));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void saveRelation(TagNotesRelation tagNotesRelation) {
		Tag tag = tagDao.findByTagName(tagNotesRelation.getTagName());
		if (tag == null) {
			tag = new Tag();
			tag.setTagName(tagNotesRelation.getTagName());
			tagDao.save(tag);
		}
		TagNotesRelation tagNotesRelation2 = tagNotesRelationDao
				.findByNotesIdAndTagName(tagNotesRelation.getNotesId(),
						tagNotesRelation.getTagName());
		if (tagNotesRelation2 == null) {
			tagNotesRelationDao.save(tagNotesRelation);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void deleteRelation(TagNotesRelation tagNotesRelation) {
		tagNotesRelation = tagNotesRelationDao.findByNotesIdAndTagName(
				tagNotesRelation.getNotesId(), tagNotesRelation.getTagName());
		if (tagNotesRelation != null) {
			tagNotesRelationDao
					.delete(tagNotesRelation.getTagNotesRelationId());
		}
	}
}
