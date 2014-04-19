package com.mind.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.bean.ErrorBean;
import com.mind.bean.NoteBean;
import com.mind.dao.INoteDao;
import com.mind.dao.INotesHistoryDao;
import com.mind.entity.Note;
import com.mind.entity.NotesHistory;
import com.mind.utils.DateUtils;

@Service
public class NoteService {
	@Autowired
	private INoteDao noteDao;

	@Autowired
	private INotesHistoryDao notesHistoryDao;

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
	public NoteBean save(NoteBean noteBean, HttpSession session) {
		if (session.getAttribute("id") == null) {
			noteBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
		} else {
			Note note = new Note();
			if (noteBean.getNoteId() != null) {
				note = noteDao.findById(noteBean.getNoteId());
				note.setReminderTime(DateUtils.parse(
						noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
				note.setContent(noteBean.getContent());
				note.setStatus(noteBean.getStatus());
				note.setModifyTime(new Date());
			} else {
				note.setUserId((Integer) session.getAttribute("id"));
				note.setReminderTime(DateUtils.parse(
						noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
				note.setContent(noteBean.getContent());
				note.setStatus(noteBean.getStatus());
				note.setModifyTime(new Date());
				note.setCreateTime(new Date());
			}
			note = noteDao.save(note);
			noteBean.setNoteId(note.getId());
			noteBean.setCreateTime(note.getCreateTime());

			NotesHistory notesHistory = new NotesHistory();
			notesHistory.setContent(noteBean.getContent());
			notesHistory.setModifyTime(new Date());
			notesHistory.setReminderTime(DateUtils.parse(
					noteBean.getReminderTime(), "yyyy-MM-dd HH:mm:ss"));
			notesHistory.setNotesId(note.getId());
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

	public NoteBean getNotes(HttpSession session) {
		NoteBean noteBean = new NoteBean();
		if (session.getAttribute("id") == null) {
			noteBean.getErrorBeanList().add(new ErrorBean("", "用户未登录"));
		} else {
			List<Note> list = noteDao
					.findByUserIdOrderByCreateTimeDesc((Integer) session
							.getAttribute("id"));
			noteBean.getNoteList().addAll(list);
		}
		if (noteBean.getErrorBeanList().size() > 0) {
			noteBean.setSuccess(false);
		}
		return noteBean;
	}

	public NoteBean getNotesHistory(NoteBean noteBean) {
		List<NotesHistory> list = notesHistoryDao
				.findByNotesIdOrderByModifyTimeDesc(noteBean.getNoteId());
		noteBean.getNoteHistoryList().addAll(list);
		return noteBean;
	}
}
