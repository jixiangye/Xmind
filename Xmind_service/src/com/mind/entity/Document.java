package com.mind.entity;

import java.io.Serializable;

import javax.persistence.*;


/**
 * The persistent class for the document database table.
 * 
 */
@Entity
@Table(name="Document")
public class Document implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="document_id")
	private Integer documentId;

	@Column(name="document_name")
	private String documentName;

	@Column(name="document_suffix")
	private String documentSuffix;

	@Column(name="document_type")
	private String documentType;

	@Column(name="notepad_id")
	private Integer notepadId;

	@Column(name="parent_document_id")
	private Integer parentDocumentId;

	private String sorted;

	@Column(name="user_id")
	private Integer userId;

	public Document() {
	}

	public Integer getDocumentId() {
		return this.documentId;
	}

	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}

	public String getDocumentName() {
		return this.documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getDocumentSuffix() {
		return this.documentSuffix;
	}

	public void setDocumentSuffix(String documentSuffix) {
		this.documentSuffix = documentSuffix;
	}

	public String getDocumentType() {
		return this.documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public Integer getNotepadId() {
		return this.notepadId;
	}

	public void setNotepadId(Integer notepadId) {
		this.notepadId = notepadId;
	}

	public Integer getParentDocumentId() {
		return this.parentDocumentId;
	}

	public void setParentDocumentId(Integer parentDocumentId) {
		this.parentDocumentId = parentDocumentId;
	}

	public String getSorted() {
		return this.sorted;
	}

	public void setSorted(String sorted) {
		this.sorted = sorted;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}