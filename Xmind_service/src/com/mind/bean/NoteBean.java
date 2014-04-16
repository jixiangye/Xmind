package com.mind.bean;

import java.util.ArrayList;
import java.util.List;

import com.mind.entity.Note;
import com.mind.entity.NotesHistory;

public class NoteBean extends BaseBean {
	private static final long serialVersionUID = 1L;

	private Integer noteId;

	private String content;

	private String reminderTime;

	private String status;

	private List<Note> noteList = new ArrayList<>();

	private List<NotesHistory> noteHistoryList = new ArrayList<>();

	public Integer getNoteId() {
		return noteId;
	}

	public void setNoteId(Integer noteId) {
		this.noteId = noteId;
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

	public List<Note> getNoteList() {
		return noteList;
	}

	public List<NotesHistory> getNoteHistoryList() {
		return noteHistoryList;
	}

}
