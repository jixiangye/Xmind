package com.mind.entity;

import java.io.Serializable;

import javax.persistence.*;


/**
 * The persistent class for the notepad database table.
 * 
 */
@Entity
@Table(name="Notepad")
public class Notepad implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="notepad_id")
	private Integer notepadId;

	@Column(name="notepad_name")
	private String notepadName;

	@Column(name="user_id")
	private Integer userId;

	public Notepad() {
	}

	public Integer getNotepadId() {
		return this.notepadId;
	}

	public void setNotepadId(Integer notepadId) {
		this.notepadId = notepadId;
	}

	public String getNotepadName() {
		return this.notepadName;
	}

	public void setNotepadName(String notepadName) {
		this.notepadName = notepadName;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}