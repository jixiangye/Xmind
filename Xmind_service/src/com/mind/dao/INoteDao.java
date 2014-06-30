package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.Notes;

public interface INoteDao extends Repository<Notes, Integer> {
    @Transactional(propagation = Propagation.SUPPORTS)
    Notes findByNotesId(Integer notesId);

    @Transactional(propagation = Propagation.SUPPORTS)
    List<Notes> findByUserIdOrderByCreateTimeDesc(Integer userId);

    @Transactional(propagation = Propagation.SUPPORTS)
    Notes save(Notes note);

    @Transactional(propagation = Propagation.SUPPORTS)
    void delete(Integer id);
}
