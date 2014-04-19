package com.mind.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.mind.utils.DateUtils;

import java.util.Date;


/**
 * The persistent class for the notes database table.
 * 
 */
@Entity
@Table(name="notes")
public class Note implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_time")
	private Date modifyTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="reminder_time")
	private Date reminderTime;

	private String status;

	@Column(name="user_Id")
	private Integer userId;

	public Note() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateTime() {
		return DateUtils.format(this.createTime, "yyyy-MM-dd HH:mm:ss");
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getModifyTime() {
		return DateUtils.format(this.modifyTime, "yyyy-MM-dd HH:mm:ss");
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getReminderTime() {
		return DateUtils.format(this.reminderTime, "yyyy-MM-dd HH:mm:ss");
	}

	public void setReminderTime(Date reminderTime) {
		this.reminderTime = reminderTime;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}