package com.osue.osueapp.service;

import com.osue.osueapp.entity.Meal;
import com.osue.osueapp.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class HealthService {

    private final MealRepository mealRepository;

    /**
     * 식단관리 조회
     * @param userId 사용자 ID
     * @param regDate 조회할 날짜 (YYYY-MM-DD)
     * @return 해당 날짜의 식단 리스트
     */
    public List<Meal> getMealsByUserIdAndDate(String userId, String regDate) {
        try {
            LocalDate date = LocalDate.parse(regDate);
            LocalDateTime startDateTime = date.atStartOfDay();  // 00:00:00
            LocalDateTime endDateTime = date.plusDays(1).atStartOfDay();  // 다음날 00:00:00
            
            log.info("사용자 {} 의 {} 날짜 식단 기록 조회 ", userId, regDate);
            
            List<Meal> mealList = mealRepository.findByUserIdAndRegDateBetween(userId, startDateTime, endDateTime);
            
            log.info("조회된 식단 일지수: {}", mealList.size());
            
            return mealList;
        } catch (Exception e) {
            log.error("식단 조회 중 오류 발생 - userId: {}, regDate: {}, error: {}", userId, regDate, e.getMessage());
            throw new RuntimeException("식단 조회 중 오류가 발생했습니다.", e);
        }
    }
}
