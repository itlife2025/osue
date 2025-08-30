package com.osue.osueapp.controller;

import com.osue.osueapp.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value="/v1")
public class LoginController {
    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String userPw = request.get("userPw");

        boolean success = userService.login(userId, userPw);
        Map<String, Object> resultMap = new HashMap<>();

        if (success) {
            resultMap.put("userId", userId);
            resultMap.put("result", true);
        } else {
            resultMap.put("result", false);
        }

        return resultMap;
    }
}
