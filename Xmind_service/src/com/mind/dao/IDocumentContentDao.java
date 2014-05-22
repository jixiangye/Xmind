package com.mind.dao;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.DocumentContent;

public interface IDocumentContentDao extends
		Repository<DocumentContent, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	DocumentContent findByDocumentId(Integer documentId);

	@Transactional(propagation = Propagation.SUPPORTS)
	DocumentContent save(DocumentContent documentContent);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Integer id);
}
