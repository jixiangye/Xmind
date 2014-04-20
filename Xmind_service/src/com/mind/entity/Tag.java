package com.mind.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the tag database table.
 * 
 */
@Entity
@Table(name="tag")
public class Tag implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="tag_name")
	private String tagName;

	public Tag() {
	}

	public String getTagName() {
		return this.tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

}