package com.mind.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.BaseBean;
import com.mind.bean.ErrorBean;
import com.mind.bean.NoteBean;
import com.mind.bean.NotesBean;
import com.mind.dao.INoteDao;
import com.mind.dao.INotesHistoryDao;
import com.mind.dao.ITagNotesRelationDao;
import com.mind.entity.Notes;
import com.mind.entity.NotesHistory;
import com.mind.entity.Tag;
import com.mind.entity.TagNotesRelation;
import com.mind.utils.DateUtils;

@Service
public class NoteService {
    @Autowired
    private INoteDao         noteDao;

    @Autowired
    private INotesHistoryDao notesHistoryDao;

    @Autowired
    ITagNotesRelationDao     tagNotesRelationDao;

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public NoteBean save(NoteBean noteBean, HttpSession session) {
        TimeZone timezone = TimeZone.getTimeZone("Asia/Shanghai");
        TimeZone.setDefault(timezone);
        if (session.getAttribute("id") == null) {
            noteBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
        } else {
            Notes note = new Notes();
            if (noteBean.getNotesId() != null) {
                note = noteDao.findByNotesId(noteBean.getNotesId());
                note.setReminderTime(DateUtils.parse(noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
                note.setContent(noteBean.getContent());
                note.setStatus(noteBean.getStatus());
                note.setModifyTime(new Date());
            } else {
                note.setUserId((Integer) session.getAttribute("id"));
                note.setReminderTime(DateUtils.parse(noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
                note.setContent(noteBean.getContent());
                note.setStatus(noteBean.getStatus());
                note.setModifyTime(new Date());
                note.setCreateTime(new Date());
            }
            note = noteDao.save(note);
            noteBean.setNotesId(note.getNotesId());
            noteBean.setCreateTime(note.getCreateTime());

            NotesHistory notesHistory = new NotesHistory();
            notesHistory.setContent(noteBean.getContent());
            notesHistory.setModifyTime(new Date());
            notesHistory.setReminderTime(DateUtils.parse(noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
            notesHistory.setNotesId(note.getNotesId());
            notesHistory.setStatus(noteBean.getStatus());
            notesHistoryDao.save(notesHistory);
        }
        if (noteBean.getErrorBeanList().size() > 0) {
            noteBean.setSuccess(false);
        }
        return noteBean;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void delete(Integer noteId) {
        noteDao.delete(noteId);
    }

    public BaseBean getNotes(HttpSession session) {
        BaseBean baseBean = new BaseBean();
        if (session.getAttribute("id") == null) {
            baseBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
        } else {
            List<NotesBean> list = new ArrayList<>();
            List<Notes> entities = noteDao.findByUserIdOrderByCreateTimeDesc((Integer) session.getAttribute("id"));
            List<TagNotesRelation> tagList = tagNotesRelationDao.findAll();
            Map<Integer, List<Tag>> tagMap = new HashMap<>();
            for (TagNotesRelation tagNotesRelation : tagList) {
                List<Tag> tags = tagMap.get(tagNotesRelation.getNotesId());
                if (tags == null) {
                    tags = new ArrayList<>();
                }
                Tag tag = new Tag();
                tag.setTagId(tagNotesRelation.getTagId());
                tag.setTagName(tagNotesRelation.getTag().getTagName());
                tag.setTagColor(tagNotesRelation.getTag().getTagColor());
                tags.add(tag);
                tagMap.put(tagNotesRelation.getNotesId(), tags);
            }
            for (Notes notes : entities) {
                NotesBean notesBean = new NotesBean();
                notesBean.setContent(notes.getContent());
                notesBean.setCreateTime(notes.getCreateTime());
                notesBean.setModifyTime(notes.getModifyTime());
                notesBean.setNotesId(notes.getNotesId());
                notesBean.setReminderTime(notes.getReminderTime());
                notesBean.setStatus(notes.getStatus());
                if (tagMap.get(notes.getNotesId()) != null) {
                    notesBean.getTags().addAll(tagMap.get(notes.getNotesId()));
                }
                list.add(notesBean);
            }
            baseBean.getResult().put("noteList", list);
        }
        if (baseBean.getErrorBeanList().size() > 0) {
            baseBean.setSuccess(false);
        }
        return baseBean;
    }

    public BaseBean getNotesHistory(NoteBean noteBean) {
        BaseBean baseBean = new BaseBean();
        List<NotesHistory> list = notesHistoryDao.findByNotesIdOrderByModifyTimeDesc(noteBean.getNotesId());
        baseBean.getResult().put("noteHistoryList", list);
        return baseBean;
    }
}
