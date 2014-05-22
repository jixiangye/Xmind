package com.mind.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the document_content database table.
 * 
 */
@Entity
@Table(name="document_content")
public class DocumentContent implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="document_content_id")
	private Integer documentContentId;

	@Column(name="document_id")
	private Integer documentId;

	@Column(name="document_value")
	private String documentValue;

	public DocumentContent() {
	}

	public Integer getDocumentContentId() {
		return this.documentContentId;
	}

	public void setDocumentContentId(Integer documentContentId) {
		this.documentContentId = documentContentId;
	}

	public Integer getDocumentId() {
		return this.documentId;
	}

	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}

	public String getDocumentValue() {
		return this.documentValue;
	}

	public void setDocumentValue(String documentValue) {
		this.documentValue = documentValue;
	}

}