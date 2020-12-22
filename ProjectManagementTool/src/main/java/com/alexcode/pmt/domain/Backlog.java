package com.alexcode.pmt.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PTSequence = 0;
    private String projectIdentifier;

    //OneToOne with Project
    //OneToMany with ProjectTask


    public Backlog() {
    }

    public Backlog(Long id, Integer PTSequence, String projectIdentifier) {
        this.id = id;
        this.PTSequence = PTSequence;
        this.projectIdentifier = projectIdentifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    @Override
    public String toString() {
        return "Backlog{" +
                "id=" + id +
                ", PTSequence=" + PTSequence +
                ", projectIdentifier='" + projectIdentifier + '\'' +
                '}';
    }
}
