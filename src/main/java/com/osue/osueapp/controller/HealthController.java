package com.osue.osueapp.controller;

import com.osue.osueapp.entity.Meal;
import com.osue.osueapp.service.HealthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/v1/health")
public class HealthController {

    private final HealthService healthService;

    /**
     * 식단관리 조회
     * @param userId 사용자 ID
     * @param startDate 시작 날짜 (YYYY-MM-DD 형식)  
     * @param endDate 종료 날짜 (YYYY-MM-DD 형식)
     * @return 해당 기간의 식단 리스트
     */
    @GetMapping("/meal/{userId}/{startDate}/{endDate}")
    public ResponseEntity<List<Meal>> getMealList(
            @PathVariable("userId") String userId,
            @PathVariable("startDate") String startDate,
            @PathVariable("endDate") String endDate) {
        
        try {
            log.info("식단 조회 req Data - userId: {}, startDate: {}, endDate: {}", userId, startDate, endDate);
            
            List<Meal> mealList = healthService.getMealsByUserIdAndDateRange(userId, startDate, endDate);
            
            log.info("식단 조회 res Data : {}", mealList);
            
            return ResponseEntity.ok(mealList);
            
        } catch (IllegalArgumentException e) {
            log.error("잘못된 날짜 형식 - startDate: {}, endDate: {}, error: {}", startDate, endDate, e.getMessage());
            return ResponseEntity.badRequest().build();
            
        } catch (Exception e) {
            log.error("식단 조회 중 오류 발생 - userId: {}, startDate: {}, endDate: {}, error: {}",
                     userId, startDate, endDate, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
