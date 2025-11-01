package com.osue.osueapp.dto;

import java.time.LocalDateTime;
import java.util.List;

public class MealLogDto {

    private Long idx;
    private String userId;
    private String mealType;
    private LocalDateTime reg_date;
    private List<MealFoodDto> mealFoods;

    public MealLogDto() {}

    public MealLogDto(Long idx, String userId, String mealType, LocalDateTime reg_date, List<MealFoodDto> mealFoods) {
        this.idx = idx;
        this.userId = userId;
        this.mealType = mealType;
        this.reg_date = reg_date;
        this.mealFoods = mealFoods;
    }

    // 식사 타입별 데이터 처리용 생성자
    public MealLogDto(String userId, String mealType, List<MealFoodDto> mealFoods) {
        this.userId = userId;
        this.mealType = mealType;
        this.mealFoods = mealFoods;
        this.reg_date = LocalDateTime.now();
    }


    public Long getIdx() {
        return idx;
    }

    public void setIdx(Long idx) {
        this.idx = idx;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public LocalDateTime getReg_date() {
        return reg_date;
    }

    public void setReg_date(LocalDateTime reg_date) {
        this.reg_date = reg_date;
    }

    public List<MealFoodDto> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(List<MealFoodDto> mealFoods) {
        this.mealFoods = mealFoods;
    }


    public static class MealFoodDto {
        private Long idx;
        private String food_name;
        private String image_url;
        private Integer kcal;
        private LocalDateTime reg_date;
        private Long meal_idx;

        public MealFoodDto() {}

        public MealFoodDto(Long idx, String food_name, String image_url, Integer kcal, LocalDateTime reg_date, Long meal_idx) {
            this.idx = idx;
            this.food_name = food_name;
            this.image_url = image_url;
            this.reg_date = reg_date;
            this.meal_idx = meal_idx;
            this.kcal = kcal;
        }

        public Long getIdx() {
            return idx;
        }

        public void setIdx(Long idx) {
            this.idx = idx;
        }

        public String getFood_name() {
            return food_name;
        }

        public void setFood_name(String food_name) {
            this.food_name = food_name;
        }

        public String getImage_url() {
            return image_url;
        }

        public void setImage_url(String image_url) {
            this.image_url = image_url;
        }

        public Integer getKcal() {
            return kcal;
        }

        public void setKcal(Integer kcal) {
            this.kcal = kcal;
        }

        public LocalDateTime getReg_date() {
            return reg_date;
        }

        public void setReg_date(LocalDateTime reg_date) {
            this.reg_date = reg_date;
        }

        public Long getMeal_idx() {
            return meal_idx;
        }

        public void setMeal_idx(Long meal_idx) {
            this.meal_idx = meal_idx;
        }
    }

}
