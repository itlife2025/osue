package com.osue.osueapp.service;

import com.osue.osueapp.dto.MealLogDto;
import com.osue.osueapp.entity.Meal;
import com.osue.osueapp.entity.MealFood;
import com.osue.osueapp.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class HealthService {

    private final MealRepository mealRepository;

    /**
     * 식단관리 조회
     * @param userId 사용자 ID
     * @param startDate 시작 날짜 (YYYY-MM-DD)
     * @param endDate 종료 날짜 (YYYY-MM-DD)
     * @return 해당 기간의 식단 리스트
     */
    public List<Meal> getMealsByUserIdAndDate(String userId, String startDate, String endDate) {
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate start = LocalDate.parse(startDate, fmt);
            LocalDate end = LocalDate.parse(endDate, fmt);
            LocalDateTime startDateTime = start.atStartOfDay();
            LocalDateTime endDateTime = end.plusDays(1).atStartOfDay();
            
            log.info("사용자 {} 의 {} ~ {} 기간 식단 기록 조회", userId, startDate, endDate);
            
            List<Meal> mealList = mealRepository.findByUserIdAndRegDateGreaterThanAndRegDateLessThan(userId, startDateTime, endDateTime);

            log.info("조회된 식단 일지수: {}", mealList.size());
            
            return mealList;
        } catch (Exception e) {
            log.error("식단 조회 중 오류 발생 - userId: {}, startDate: {}, endDate: {}, error: {}", userId, startDate, endDate, e.getMessage());
            throw new RuntimeException("식단 조회 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 식단관리 작성
     * @param mealLogDto 저장데이터
     * @return 해당 기간의 식단 리스트
     */
    public void saveMealLog(MealLogDto mealLogDto, Authentication authentication) {

        try {
            Map<String, Object> userMap = (Map<String, Object>) authentication.getPrincipal();
            log.info("사용자 {} 의 기간 식단 기록 {}", userMap.get("userId"), mealLogDto);

//            mealRepository.save(meal);

        } catch (Exception e) {
//            log.error("식단 기록 저장 중 오류 발생 - userId: {}, error: {}", meal.getUserId(), e.getMessage());
            throw new RuntimeException("식단 저장 중 오류가 발생했습니다.", e);
        }
    }
}
