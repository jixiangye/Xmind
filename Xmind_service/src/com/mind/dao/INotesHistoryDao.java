package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.NotesHistory;

public interface INotesHistoryDao extends Repository<NotesHistory, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	NotesHistory save(NotesHistory notesHistory);
	
	@Transactional(propagation = Propagation.SUPPORTS)
	List<NotesHistory> findByNotesIdOrderByModifyTimeDesc(Integer notesId);
}
