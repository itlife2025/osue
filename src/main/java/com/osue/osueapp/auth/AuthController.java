package com.osue.osueapp.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // DB 대신 하드코딩된 계정 체크 (테스트용)
        if("user".equals(request.username()) && "pass".equals(request.password())){
            String token = JwtUtil.generateToken(request.username());
            return ResponseEntity.ok(new TokenResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    record TokenResponse(String token) {}
}
