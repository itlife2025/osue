package com.osue.osueapp.service;

import com.osue.osueapp.dto.MealDataDto;
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
import java.util.ArrayList;
import java.util.HashMap;
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
            
            // 로그에서 각 식단의 기본 정보만 출력 (toString() 오류 방지)
            for (Meal meal : mealList) {
                log.debug("식단 - ID: {}, 타입: {}, 날짜: {}", meal.getIdx(), meal.getMealType(), meal.getRegDate());
            }
            
            return mealList;
        } catch (Exception e) {
            log.error("식단 조회 중 오류 발생 - userId: {}, startDate: {}, endDate: {}, error: {}", userId, startDate, endDate, e.getMessage());
            throw new RuntimeException("식단 조회 중 오류가 발생했습니다.", e);
        }
    }


    /**
     * 식단관리 작성
     * @param mealData 식사 타입별 데이터 (breakfast, lunch, dinner, snacks)
     * @param authentication 인증 정보
     * @return 저장 결과 정보
     */
    public Map<String, Object> saveMealLog(MealDataDto mealData, Authentication authentication) {

        try {
            Map<String, Object> userMap = (Map<String, Object>) authentication.getPrincipal();
            String userId = (String) userMap.get("userId");
            
            log.info("사용자 {} 의 식단 기록 저장 시작", userId);

            Map<String, Object> result = new HashMap<>();
            List<Long> savedMealIds = new ArrayList<>();

            // 각 식사 타입별로 처리
            Long breakfastId = processMealType(userId, "breakfast", mealData.getBreakfast());
            if (breakfastId != null) savedMealIds.add(breakfastId);
            
            Long lunchId = processMealType(userId, "lunch", mealData.getLunch());
            if (lunchId != null) savedMealIds.add(lunchId);
            
            Long dinnerId = processMealType(userId, "dinner", mealData.getDinner());
            if (dinnerId != null) savedMealIds.add(dinnerId);
            
            Long snacksId = processSnacks(userId, mealData.getSnacks());
            if (snacksId != null) savedMealIds.add(snacksId);

            result.put("userId", userId);
            result.put("savedMealIds", savedMealIds);
            result.put("totalSavedMeals", savedMealIds.size());
            result.put("timestamp", LocalDateTime.now());

            // 실제로 저장된 데이터가 있는지 확인
            if (savedMealIds.isEmpty()) {
                result.put("hasData", false);
                result.put("message", "저장할 식단 데이터가 없습니다.");
                log.info("사용자 {} 의 식단 기록 - 저장할 데이터 없음", userId);
            } else {
                result.put("hasData", true);
                result.put("message", "식단이 성공적으로 저장되었습니다.");
                log.info("사용자 {} 의 식단 기록 저장 완료 - 총 {} 개 식사 저장", userId, savedMealIds.size());
            }
            
            return result;

        } catch (Exception e) {
            log.error("식단 기록 저장 중 오류 발생 - error: {}", e.getMessage());
            throw new RuntimeException("식단 저장 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 식사 타입별 처리 (breakfast, lunch, dinner)
     * @return 저장된 Meal의 ID, 저장할 데이터가 없으면 null
     */
    private Long processMealType(String userId, String mealType, MealDataDto.MealTypeDto mealTypeDto) {
        if (mealTypeDto != null && mealTypeDto.getFoods() != null) {
            List<MealLogDto.MealFoodDto> mealFoods = new ArrayList<>();
            
            for (MealDataDto.FoodDto food : mealTypeDto.getFoods()) {
                if (food.getFoodName() != null && !food.getFoodName().trim().isEmpty()) {
                    MealLogDto.MealFoodDto mealFoodDto = new MealLogDto.MealFoodDto();
                    mealFoodDto.setFood_name(food.getFoodName());
                    mealFoodDto.setReg_date(LocalDateTime.now());
                    mealFoodDto.setKcal(mealTypeDto.getKcal());
                    mealFoods.add(mealFoodDto);
                }
            }

            if (!mealFoods.isEmpty()) {
                MealLogDto mealLogDto = new MealLogDto(userId, mealType, mealFoods);
                log.info("{} 식사 저장: {} 개 음식", mealType, mealFoods.size());
                
                // 실제 저장 로직 구현
                Meal meal = convertToMealEntity(mealLogDto);
                mealRepository.save(meal);
                log.info("{} 식사 저장 완료 - meal idx: {}", mealType, meal.getIdx());
                
                return meal.getIdx();
            }
        }
        return null;
    }

    /**
     * 간식 처리
     * @return 저장된 Meal의 ID, 저장할 데이터가 없으면 null
     */
    private Long processSnacks(String userId, List<MealDataDto.FoodDto> snacks) {
        if (snacks != null && !snacks.isEmpty()) {
            List<MealLogDto.MealFoodDto> mealFoods = new ArrayList<>();
            
            for (MealDataDto.FoodDto snack : snacks) {
                if (snack.getFoodName() != null && !snack.getFoodName().trim().isEmpty()) {
                    MealLogDto.MealFoodDto mealFoodDto = new MealLogDto.MealFoodDto();
                    mealFoodDto.setFood_name(snack.getFoodName());
                    mealFoodDto.setReg_date(LocalDateTime.now());
                    mealFoods.add(mealFoodDto);
                }
            }
            System.out.println("mealFoods");
            System.out.println(mealFoods);

            if (!mealFoods.isEmpty()) {
                MealLogDto mealLogDto = new MealLogDto(userId, "snacks", mealFoods);
                log.info("간식 저장: {} 개 음식", mealFoods.size());
                
                // 실제 저장 로직 구현
                Meal meal = convertToMealEntity(mealLogDto);
                mealRepository.save(meal);
                log.info("간식 저장 완료 - meal idx: {}", meal.getIdx());
                
                return meal.getIdx();
            }
        }
        return null;
    }

    /**
     * MealLogDto를 Meal 엔티티로 변환
     */
    private Meal convertToMealEntity(MealLogDto mealLogDto) {
        Meal meal = new Meal();
        meal.setUserId(mealLogDto.getUserId());
        meal.setMealType(mealLogDto.getMealType());
        meal.setRegDate(mealLogDto.getReg_date());
        
        // MealFood 리스트 변환
        List<MealFood> mealFoods = new ArrayList<>();
        for (MealLogDto.MealFoodDto mealFoodDto : mealLogDto.getMealFoods()) {
            MealFood mealFood = convertToMealFoodEntity(mealFoodDto);
            mealFood.setMeal(meal);
            mealFoods.add(mealFood);
        }
        
        meal.setMealFoods(mealFoods);
        return meal;
    }

    /**
     * MealFoodDto를 MealFood 엔티티로 변환
     */
    private MealFood convertToMealFoodEntity(MealLogDto.MealFoodDto mealFoodDto) {
        MealFood mealFood = new MealFood();
        mealFood.setFoodName(mealFoodDto.getFood_name());
        mealFood.setRegDate(mealFoodDto.getReg_date());
        
        // kcal 처리 - DTO는 Integer, Entity는 String
        if (mealFoodDto.getKcal() != null) {
            mealFood.setKcal(mealFoodDto.getKcal().toString());
        } else {
            mealFood.setKcal("0");
        }
        
        // imageUrl 처리 - 현재는 빈 문자열로 설정
        mealFood.setImageUrl("");
        
        return mealFood;
    }

}
