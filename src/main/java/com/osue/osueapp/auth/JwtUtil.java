package com.osue.osueapp.auth;

import com.osue.osueapp.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/*
* 토큰 생성/검증
* */
@Component
public class JwtUtil {
    private final SecretKey key;
    private static final long EXPIRATION_TIME = 1000 * 60 * 30;

    public JwtUtil(@Value("${jwt.secret}") String encodedKey) {
        if (encodedKey == null || encodedKey.isBlank()) {
            throw new IllegalArgumentException("JWT secret is not configured (jwt.secret).");
        }
        byte[] keyBytes = Decoders.BASE64.decode(encodedKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        String token = Jwts.builder()
                        .subject(user.getUserId())
                        .claim("userName", user.getUserName())
                        .issuedAt(new Date())
                        .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                        .signWith(key)
                        .compact();
        /*System.out.println("key : " + key);
        System.out.println("Generated JWT : " + token);*/
        return token;
    }

    public Map<String, Object> validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                                .verifyWith(key)   // 서명 검증
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();

            /*System.out.println("subject: " + claims.getSubject());
            System.out.println("userName: " + claims.get("userName"));
            System.out.println("issuedAt: " + claims.getIssuedAt());
            System.out.println("expiration: " + claims.getExpiration());*/

            Map<String, Object> validatedMap = new HashMap<>();
            if(claims != null) {
                validatedMap.put("userId", claims.getSubject());
                validatedMap.put("userName", claims.get("userName"));
            }

            return validatedMap;
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT Token");
        }
    }
}
