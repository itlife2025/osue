package com.osue.osueapp.auth;

import com.osue.osueapp.entity.User;
import com.osue.osueapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value="/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil,  UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String userId = body.get("userId");
        String userPw = body.get("userPw");

        User user = userService.login(userId, userPw);
        if (user != null && user.getUserId().equals(userId) && userPw.equals(user.getUserPw())) {
            String token = jwtUtil.generateToken(user);
            return Map.of("token", token);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    @GetMapping("/checkToken")
    public ResponseEntity<Map<String, Object>> me(HttpServletRequest request) {
        Map<String, Object> userMap = (Map<String, Object>) request.getAttribute("user");
        if (userMap == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(userMap);
    }
}
