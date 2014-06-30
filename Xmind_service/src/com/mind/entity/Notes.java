package com.mind.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.mind.utils.DateUtils;

/**
 * The persistent class for the notes database table.
 * 
 */
@Entity
@Table(name = "notes")
public class Notes implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notes_id")
    private Integer           notesId;

    private String            content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time")
    private Date              createTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modify_time")
    private Date              modifyTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reminder_time")
    private Date              reminderTime;

    private String            status;

    @Column(name = "user_Id")
    private Integer           userId;

    public Notes() {}

    public Integer getNotesId() {
        return this.notesId;
    }

    public void setNotesId(Integer notesId) {
        this.notesId = notesId;
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