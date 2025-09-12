package com.osue.osueapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name="meal_food")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "food_name", nullable = false)
    private String foodName;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "kcal", nullable = false)
    private String kcal;

    @CreationTimestamp
    @Column(name = "reg_date", nullable = false)
    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="meal_idx", nullable = false)
    private Meal meal;

}
