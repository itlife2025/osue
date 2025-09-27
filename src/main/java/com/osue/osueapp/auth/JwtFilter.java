package com.osue.osueapp.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
* 모든 요청에서 Authorization 헤더의 Bearer <token>을 읽어 토근 검증 후 정보를 요청(request)에 붙여주는 필터
*
* 동작
* 1. Authorization 헤더 확인
* 2. Bearer 접두사 제거 후 JwtUtil.vaildateToken(token) 호출
* 3. 검증 성공하면 request.setAttribute("username", username)로 사용자 정보 전달
* 4. 실패 시 401 응답 후 필터 체인 종료
* */
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                // JWT 검증
                String username = JwtUtil.validateToken(token);
                // 검증 성공 시 요청에 username 정보 저장
                request.setAttribute("username", username);
            } catch (Exception e) {
                // 토큰이 유효하지 않은 경우 401 반환 후 종료
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        // JWT가 없거나 정상적인 경우 모두 filterChain 호출 → Controller/Service로 요청 전달
        filterChain.doFilter(request, response);
    }
}
