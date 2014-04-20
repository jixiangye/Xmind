package com.mind.entity;

import java.io.Serializable;

import javax.persistence.*;


/**
 * The persistent class for the tag_notes_relation database table.
 * 
 */
@Entity
@Table(name="tag_notes_relation")
public class TagNotesRelation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="tag_notes_relation_id")
	private Integer tagNotesRelationId;

	@Column(name="notes_id")
	private Integer notesId;

	@Column(name="tag_name")
	private String tagName;

	public TagNotesRelation() {
	}

	public Integer getTagNotesRelationId() {
		return this.tagNotesRelationId;
	}

	public void setTagNotesRelationId(Integer tagNotesRelationId) {
		this.tagNotesRelationId = tagNotesRelationId;
	}

	public Integer getNotesId() {
		return this.notesId;
	}

	public void setNotesId(Integer notesId) {
		this.notesId = notesId;
	}

	public String getTagName() {
		return this.tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
}