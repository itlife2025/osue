package com.osue.osueapp.controller;

import com.osue.osueapp.entity.User;
import com.osue.osueapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value="/v1")
public class LoginController {
    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/loginCheck")
    public ResponseEntity<User> me(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(user);
    }


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> request, HttpSession session) {
        String userId = request.get("userId");
        String userPw = request.get("userPw");

        User user = userService.login(userId, userPw);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        else  {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logOut")
    public ResponseEntity<Void> logOut(@RequestBody Map<String, String> request, HttpSession session, HttpServletResponse response) {
        session.invalidate();
        // JSESSIONID 쿠키 삭제
        ResponseCookie cookie = ResponseCookie.from("JSESSIONID", "")
                .path("/")
                .maxAge(0)   // 즉시 만료
                .httpOnly(true)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok().build();
    }
}
