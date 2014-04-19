package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.Note;

public interface INoteDao extends Repository<Note, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	Note findById(Integer id);

	@Transactional(propagation = Propagation.SUPPORTS)
	List<Note> findByUserIdOrderByCreateTimeDesc(Integer userId);

	@Transactional(propagation = Propagation.SUPPORTS)
	Note save(Note note);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Integer id);
}
