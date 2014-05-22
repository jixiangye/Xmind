package com.mind.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mind.bean.BaseBean;
import com.mind.bean.DocumentBean;
import com.mind.bean.DocumentContentBean;
import com.mind.bean.ItemListBean;
import com.mind.bean.NotepadBean;
import com.mind.entity.Document;
import com.mind.entity.DocumentContent;
import com.mind.entity.Notepad;
import com.mind.service.DocumentService;

@Controller
@RequestMapping("/document")
public class DocumentController {
	@Autowired
	private DocumentService documentService;

	@RequestMapping(value = "/findNotepadByUserId", method = RequestMethod.POST)
	@ResponseBody
	public ItemListBean<Notepad> findNotepadByUserId(HttpSession session) {
		Integer userId = (Integer) session.getAttribute("id");
		return documentService.findNotepadByUserId(userId);
	}

	@RequestMapping(value = "/saveNotepad", method = RequestMethod.POST)
	@ResponseBody
	public NotepadBean saveNotepad(@RequestBody Notepad notepad,
			HttpSession session) {
		Integer userId = (Integer) session.getAttribute("id");
		notepad.setUserId(userId);
		return documentService.saveNotepad(notepad);
	}

	@RequestMapping(value = "/deleteNotepad", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean deleteNotepad(@RequestBody NotepadBean notepadBean) {
		documentService.deleteNotepad(notepadBean.getNotepadId());
		return new BaseBean();
	}

	@RequestMapping(value = "/findDocumentByUserId", method = RequestMethod.POST)
	@ResponseBody
	public ItemListBean<Document> findDocumentByUserId(HttpSession session) {
		Integer userId = (Integer) session.getAttribute("id");
		return documentService.findDocumentByUserId(userId);
	}

	@RequestMapping(value = "/saveDocument", method = RequestMethod.POST)
	@ResponseBody
	public DocumentBean saveDocument(@RequestBody Document document,
			HttpSession session) {
		Integer userId = (Integer) session.getAttribute("id");
		document.setUserId(userId);
		return documentService.saveDocument(document);
	}

	@RequestMapping(value = "/deleteDocument", method = RequestMethod.POST)
	@ResponseBody
	public BaseBean deleteDocument(@RequestBody DocumentBean documentBean) {
		documentService.deleteDocument(documentBean.getDocumentId());
		return new BaseBean();
	}

	@RequestMapping(value = "/findContentByDocumentId", method = RequestMethod.POST)
	@ResponseBody
	public DocumentContentBean findContentByDocumentId(
			@RequestBody DocumentContent documentContent) {
		return documentService.findContentByDocumentId(documentContent
				.getDocumentId());
	}

	@RequestMapping(value = "/saveDocumentContent", method = RequestMethod.POST)
	@ResponseBody
	public DocumentContentBean saveDocumentContent(
			@RequestBody DocumentContent documentContent) {
		return documentService.saveDocumentContent(documentContent);
	}
}
