package com.osue.osueapp.repository;

import com.osue.osueapp.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findByUserIdAndRegDateBetween(String userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
