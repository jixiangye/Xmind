package com.mind.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mind.entity.User;

public interface ILoginDao extends Repository<User, Integer> {
    @Transactional(propagation = Propagation.SUPPORTS)
    User findByUsernameAndPassword(String username, String password);

    @Transactional(propagation = Propagation.SUPPORTS)
    User save(User user);

    @Transactional(propagation = Propagation.SUPPORTS)
    List<User> findByUsername(String username);

    @Transactional(propagation = Propagation.SUPPORTS)
    List<User> findByEmail(String email);
}
