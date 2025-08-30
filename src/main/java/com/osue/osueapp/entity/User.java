package com.osue.osueapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    @Id
    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String userPw;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String phoneNo;

    @Column(nullable = true)
    private String birth;

    @Column(nullable = false)
    private String useYn;

    @Column(nullable = false)
    private String regDate;

    @Column(nullable = true)
    private String chgDate;
}
