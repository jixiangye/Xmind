package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.Document;

public interface IDocumentDao extends Repository<Document, Integer> {
	@Transactional(propagation = Propagation.SUPPORTS)
	List<Document> findAll();

	@Transactional(propagation = Propagation.SUPPORTS)
	List<Document> findByUserId(Integer userId);

	@Transactional(propagation = Propagation.SUPPORTS)
	Document save(Document document);

	@Transactional(propagation = Propagation.SUPPORTS)
	void delete(Integer id);
}
