package com.osue.osueapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
//    private final JwtFilter jwtFilter;
//
//    public WebConfig(JwtFilter jwtFilter) {
//        this.jwtFilter = jwtFilter;
//    }
//
//    @Bean
//    public FilterRegistrationBean<JwtFilter> jwtFilterRegistration() {
//        FilterRegistrationBean<JwtFilter> registration = new FilterRegistrationBean<>();
//        registration.setFilter(jwtFilter);
//        registration.addUrlPatterns("/*");
//        registration.setOrder(1); // 필터 순서
//        return registration;
//    }
}
