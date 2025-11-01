package com.osue.osueapp.controller;

import com.osue.osueapp.dto.MealDataDto;
import com.osue.osueapp.entity.Meal;
import com.osue.osueapp.service.HealthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
            
            List<Meal> mealList = healthService.getMealsByUserIdAndDate(userId, startDate, endDate);
            
            log.info("식단 조회 res Data - 총 {} 개", mealList.size());
            
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


    /**
     * 식단관리 작성
     * @param mealData 식사 타입별 데이터 (breakfast, lunch, dinner, snacks)
     * @param authentication 인증 정보
     * @return 성공 응답
     */
    @PostMapping("/meal")
    public ResponseEntity<Map<String, Object>> saveMealLog(@RequestBody MealDataDto mealData, Authentication authentication) {
        try {
            log.info("식단 기록 req Data - {}", mealData);
            log.info("breakfast: {}", mealData.getBreakfast());
            log.info("lunch: {}", mealData.getLunch());
            log.info("dinner: {}", mealData.getDinner());
            log.info("snacks: {}", mealData.getSnacks());

            Map<String, Object> result = healthService.saveMealLog(mealData, authentication);
            
            Map<String, Object> response = new HashMap<>();
            
            // 실제로 저장된 데이터가 있는지 확인
            Boolean hasData = (Boolean) result.get("hasData");
            if (hasData != null && hasData) {
                response.put("success", true);
                response.put("message", result.get("message"));
                response.put("data", result);
                return ResponseEntity.ok(response);
            } else {
                // 저장할 데이터가 없는 경우
                response.put("success", false);
                response.put("message", result.get("message"));
                response.put("data", result);
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            log.error("식단 저장 중 오류 발생 - data: {}, error: {}", mealData, e.getMessage());
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "식단 저장 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
