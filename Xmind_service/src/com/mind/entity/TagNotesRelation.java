package com.mind.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * The persistent class for the tag_notes_relation database table.
 * 
 */
@Entity
@Table(name = "tag_notes_relation")
public class TagNotesRelation implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tag_notes_relation_id")
    private Integer           tagNotesRelationId;

    @Column(name = "notes_id")
    private Integer           notesId;

    @Column(name = "tag_id")
    private Integer           tagId;

    @OneToOne
    @JoinColumn(name = "tag_id", insertable = false, updatable = false)
    private Tag               tag;

    public TagNotesRelation() {}

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

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

}