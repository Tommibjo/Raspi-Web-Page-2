/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.juurivuohi.jpa;

import javax.persistence.Entity;
import javax.persistence.Id;
import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 *
 * @author Tommi
 */
@Entity
public class Comment extends AbstractPersistable<Long> {

    @Id
    private Long id;
    private String username;
    private String comment;
    private String postTime;

    public Comment(String username, String comment, String postTime) {
        this.id = id;
        this.username = username;
        this.comment = comment;
        this.postTime = postTime;
    }

    public Comment() {
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPostTime() {
        return postTime;
    }

    public void setPostTime(String postTime) {
        this.postTime = postTime;
    }

}
