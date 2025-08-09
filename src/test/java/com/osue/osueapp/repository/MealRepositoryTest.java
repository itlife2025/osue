package com.osue.osueapp.repository;

import com.osue.osueapp.entity.Meal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
public class MealRepositoryTest {

    @Autowired
    private MealRepository mealRepository;

    private Meal testMeal1;
    private Meal testMeal2;
    private Meal testMeal3;
    private Meal testMeal4;


    @BeforeEach
    void SetUp() {
        // 데이터베이스 초기화
        mealRepository.deleteAll();
        
        // 테스트 데이터 저장 후 날짜 수정
        testMeal1 = new Meal();
        testMeal1.setUserId("user1");
        testMeal1.setMealType("dinner");
        testMeal1 = mealRepository.save(testMeal1);
        testMeal1.setRegDate(LocalDateTime.of(2025,8, 3, 15, 21));
        testMeal1 = mealRepository.save(testMeal1);

        testMeal2 = new Meal();
        testMeal2.setUserId("user1");
        testMeal2.setMealType("breakfast");
        testMeal2 = mealRepository.save(testMeal2);
        testMeal2.setRegDate(LocalDateTime.of(2025,8, 9, 12, 48));
        testMeal2 = mealRepository.save(testMeal2);

        testMeal3 = new Meal();
        testMeal3.setUserId("user2");
        testMeal3.setMealType("breakfast");
        testMeal3 = mealRepository.save(testMeal3);
        testMeal3.setRegDate(LocalDateTime.of(2025,8, 9, 12, 48));
        testMeal3 = mealRepository.save(testMeal3);

        testMeal4 = new Meal();
        testMeal4.setUserId("user1");
        testMeal4.setMealType("lunch");
        testMeal4 = mealRepository.save(testMeal4);
        testMeal4.setRegDate(LocalDateTime.of(2025,8, 9, 22, 13));
        testMeal4 = mealRepository.save(testMeal4);
    }

    @Test
    @DisplayName("조회")
    void testFindByUserIdAndRegDate() {
        System.out.println("testFindByUserIdAndRegDate");

        mealRepository.save(testMeal1);
        mealRepository.save(testMeal2);
        mealRepository.save(testMeal3);
        mealRepository.save(testMeal4);


        LocalDate date = LocalDate.of(2025, 8, 9);
        LocalDateTime startDateTime = date.atStartOfDay();
        LocalDateTime endDateTime = date.plusDays(1).atStartOfDay();
        
        List<Meal> mealTestList = mealRepository.findByUserIdAndRegDateBetween("user1", startDateTime, endDateTime);
        System.out.println("mealTestList: " + mealTestList);

        assertThat(mealTestList).hasSize(2);
        assertThat(mealTestList.get(0).getUserId()).isEqualTo("user1");
        assertThat(mealTestList.get(1).getUserId()).isEqualTo("user1");
        assertThat(mealTestList.get(1).getRegDate().toLocalDate()).isEqualTo(LocalDate.of(2025, 8, 9));


    }

}
