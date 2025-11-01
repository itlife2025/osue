package com.osue.osueapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="meal_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "meal_type", nullable = false, length = 20)
    private String mealType;

    @CreationTimestamp
    @Column(name = "reg_date", nullable = false)
    private LocalDateTime regDate;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // JSON 직렬화 시 제외
    @ToString.Exclude // toString()에서 제외
    private List<MealFood> mealFoods = new ArrayList<>();

    public void addMealFood(MealFood mealFood) {mealFoods.add(mealFood); mealFood.setMeal(this);}

}
