package com.osue.osueapp.service;

import com.osue.osueapp.entity.User;
import com.osue.osueapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String userId, String userPw) {
        return userRepository.findByUserId(userId)
                .filter(user -> userPw.equals(user.getUserPw()))
                .map(user -> {
                    return user;
                })
                .orElse(null);
    }
}
