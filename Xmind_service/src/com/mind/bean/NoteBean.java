package com.mind.bean;

import java.util.ArrayList;
import java.util.List;

import com.mind.entity.NotesHistory;

public class NoteBean extends BaseBean {
	private static final long serialVersionUID = 1L;

	private Integer notesId;

	private String content;

	private String reminderTime;

	private String status;

	private List<NotesBean> noteList = new ArrayList<>();

	private List<NotesHistory> noteHistoryList = new ArrayList<>();

	private String createTime;

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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

	public List<NotesBean> getNoteList() {
		return noteList;
	}

	public List<NotesHistory> getNoteHistoryList() {
		return noteHistoryList;
	}

}
