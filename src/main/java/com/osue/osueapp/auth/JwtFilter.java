package com.osue.osueapp.auth;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Component
public class JwtFilter implements Filter {
    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 로그인은 토큰 없이 접근
//        String path = request.getRequestURI();
//        if(path.startsWith("/auth/login")) {
//            chain.doFilter(req, res);
//            return;
//        }
//        System.out.println("TTTTTȚ?");
//        String header = request.getHeader("Authorization");
//        if(header == null || !header.startsWith("Bearer ")) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        }
//
//        String token = header.substring(7);
//        try {
//            if(token != null && !token.isEmpty()) {
//                Map<String, Object> userMap = jwtUtil.validateToken(token);
//                // 검증 성공 시 사용자 정보 저장 (필요하면 Controller에서 꺼낼 수 있음)
//                request.setAttribute("user", userMap);
//            }
//        } catch (Exception e) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        }


        String header = request.getHeader("Authorization");

        // 토큰이 있으면 검증
        if(header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                if(token != null && !token.isEmpty()) {
                    Map<String, Object> userMap = jwtUtil.validateToken(token);
                    // 검증 성공 시 사용자 정보 저장
                    request.setAttribute("user", userMap);

                    SecurityContextHolder.getContext().setAuthentication(
                            new UsernamePasswordAuthenticationToken(userMap, "", Collections.emptyList())
                    );
                }
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        chain.doFilter(req, res);
    }
}
