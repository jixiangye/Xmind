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
 * The persistent class for the notes_history database table.
 * 
 */
@Entity
@Table(name = "notes_history")
public class NotesHistory implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notes_history_id")
    private Integer           notesHistoryId;

    private String            content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modify_time")
    private Date              modifyTime;

    @Column(name = "notes_id")
    private Integer           notesId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reminder_time")
    private Date              reminderTime;

    private String            status;

    public NotesHistory() {}

    public Integer getNotesHistoryId() {
        return this.notesHistoryId;
    }

    public void setNotesHistoryId(Integer notesHistoryId) {
        this.notesHistoryId = notesHistoryId;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getModifyTime() {
        return DateUtils.format(this.modifyTime, "yyyy-MM-dd HH:mm:ss");
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public Integer getNotesId() {
        return this.notesId;
    }

    public void setNotesId(Integer notesId) {
        this.notesId = notesId;
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

}