package com.mind.bean;

public class TagNotesRelationBean extends BaseBean {
	private static final long serialVersionUID = 1L;

	private Integer tagNotesRelationId;

	private String tagName;

	private String tagColor;

	private Integer notesId;

	public Integer getTagNotesRelationId() {
		return tagNotesRelationId;
	}

	public void setTagNotesRelationId(Integer tagNotesRelationId) {
		this.tagNotesRelationId = tagNotesRelationId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public Integer getNotesId() {
		return notesId;
	}

	public void setNotesId(Integer notesId) {
		this.notesId = notesId;
	}

	public String getTagColor() {
		return tagColor;
	}

	public void setTagColor(String tagColor) {
		this.tagColor = tagColor;
	}

}
