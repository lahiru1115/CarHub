package com.carapi.car_data_api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private int year;
    private String fuelType;
    private int cityMpg;
    private int highwayMpg;
    private int combinationMpg;
    private int cylinders;
    private double displacement;
    private String drive;
    private String transmission;
    private String carClass;
}
