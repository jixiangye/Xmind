package com.mind.bean;

public class TagNotesRelationBean extends BaseBean {
    private static final long serialVersionUID = 1L;

    private Integer           tagId;

    private Integer           notesId;

    public Integer getNotesId() {
        return notesId;
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

}
