package com.mind.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.DocumentBean;
import com.mind.bean.DocumentContentBean;
import com.mind.bean.ItemListBean;
import com.mind.bean.NotepadBean;
import com.mind.dao.IDocumentContentDao;
import com.mind.dao.IDocumentDao;
import com.mind.dao.INotepadDao;
import com.mind.entity.Document;
import com.mind.entity.DocumentContent;
import com.mind.entity.Notepad;

@Service
public class DocumentService {
	@Autowired
	private INotepadDao notepadDao;

	@Autowired
	private IDocumentDao documentDao;

	@Autowired
	private IDocumentContentDao documentContentDao;

	public ItemListBean<Notepad> findNotepadByUserId(Integer userId) {
		ItemListBean<Notepad> itemListBean = new ItemListBean<Notepad>();
		itemListBean.setList(notepadDao.findByUserId(userId));
		return itemListBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public NotepadBean saveNotepad(Notepad notepad) {
		NotepadBean notepadBean = new NotepadBean();
		notepad = notepadDao.save(notepad);
		notepadBean.setNotepadId(notepad.getNotepadId());
		return notepadBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void deleteNotepad(Integer notepadId) {
		notepadDao.delete(notepadId);
	}

	public ItemListBean<Document> findDocumentByUserId(Integer userId) {
		ItemListBean<Document> itemListBean = new ItemListBean<Document>();
		itemListBean.setList(documentDao.findByUserId(userId));
		return itemListBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public DocumentBean saveDocument(Document document) {
		DocumentBean documentBean = new DocumentBean();
		document = documentDao.save(document);
		documentBean.setDocumentId(document.getDocumentId());
		return documentBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public void deleteDocument(Integer documentId) {
		documentDao.delete(documentId);
	}

	public DocumentContentBean findContentByDocumentId(Integer documentId) {
		DocumentContentBean documentContentBean = new DocumentContentBean();
		documentContentBean.setDocumentContent(documentContentDao
				.findByDocumentId(documentId));
		return documentContentBean;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public DocumentContentBean saveDocumentContent(
			DocumentContent documentContent) {
		DocumentContentBean documentContentBean = new DocumentContentBean();
		documentContent = documentContentDao.save(documentContent);
		documentContentBean.setDocumentContent(documentContent);
		return documentContentBean;
	}
}
