package com.osue.osueapp.service;

import com.osue.osueapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean login(String userId, String userPw) {
        return userRepository.findByUserId(userId)
                .map(user -> user.getUserPw().equals(userPw))
                .orElse(false);
    }
}
