package com.osue.osueapp.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

/*
* JWT 발급(generateToken)과 검증(validateToken)을 담당
* */
public class JwtUtil {
    /*
    * 서버 재기동 시 새로운 랜덤 키 생성
    * 실무에서는 고정된 비밀키(혹은 키 페어)를 외부 설정에서 읽어 사용해야 함
    * */
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    /* 토큰 만료 시간 */
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public static String validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
