package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.Tag;

public interface ITagDao extends Repository<Tag, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	List<Tag> findAll();

	@Transactional(propagation = Propagation.SUPPORTS)
	Tag findByTagName(String tagName);

	@Transactional(propagation = Propagation.SUPPORTS)
	Tag save(Tag tag);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Integer tagId);
}
