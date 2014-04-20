package com.mind.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class NotesBean implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer notesId;

	private String content;

	private String createTime;

	private String modifyTime;

	private String reminderTime;

	private String status;

	private List<String> tags = new ArrayList<>();

	public List<String> getTags() {
		return tags;
	}

	public Integer getNotesId() {
		return notesId;
	}

	public void setNotesId(Integer notesId) {
		this.notesId = notesId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getReminderTime() {
		return reminderTime;
	}

	public void setReminderTime(String reminderTime) {
		this.reminderTime = reminderTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
