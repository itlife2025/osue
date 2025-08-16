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
     * @param regDate 조회할 날짜 (YYYY-MM-DD 형식)
     * @return 해당 날짜의 식단 리스트
     */
    @GetMapping("/meal/{userId}/{regDate}")
    public ResponseEntity<List<Meal>> getMealList(
            @PathVariable("userId") String userId, 
            @PathVariable("regDate") String regDate) {
        
        try {
            log.info("식단 조회 req Data - userId: {}, regDate: {}", userId, regDate);
            
            List<Meal> mealList = healthService.getMealsByUserIdAndDate(userId, regDate);
            
            log.info("식단 조회 res Data : {}", mealList);
            
            return ResponseEntity.ok(mealList);
            
        } catch (IllegalArgumentException e) {
            log.error("잘못된 날짜 형식 - regDate: {}, error: {}", regDate, e.getMessage());
            return ResponseEntity.badRequest().build();
            
        } catch (Exception e) {
            log.error("식단 조회 중 오류 발생 - userId: {}, regDate: {}, error: {}",
                     userId, regDate, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
