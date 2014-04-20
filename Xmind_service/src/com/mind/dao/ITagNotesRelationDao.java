package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.TagNotesRelation;

public interface ITagNotesRelationDao extends
		Repository<TagNotesRelation, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	List<TagNotesRelation> findAll();

	@Transactional(propagation = Propagation.SUPPORTS)
	List<TagNotesRelation> findByTagName(String tagName);

	@Transactional(propagation = Propagation.SUPPORTS)
	TagNotesRelation findByNotesIdAndTagName(Integer notesId, String tagName);

	@Transactional(propagation = Propagation.SUPPORTS)
	TagNotesRelation save(TagNotesRelation tagNotesRelation);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Integer id);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Iterable<TagNotesRelation> entities);
}
