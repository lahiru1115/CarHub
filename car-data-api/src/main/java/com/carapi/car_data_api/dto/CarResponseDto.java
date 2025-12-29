package com.carapi.car_data_api.dto;

import com.carapi.car_data_api.model.Car;

public class CarResponseDto {
    private String make;
    private String model;
    private int year;
    private String fuel_type;
    private String car_class;
    private int city_mpg;
    private int combination_mpg;
    private int cylinders;
    private double displacement;
    private String drive;
    private int highway_mpg;
    private String transmission;

    public CarResponseDto(Car car) {
        this.make = car.getMake();
        this.model = car.getModel();
        this.year = car.getYear();
        this.fuel_type = car.getFuelType();
        this.car_class = car.getCarClass();
        this.city_mpg = car.getCityMpg();
        this.combination_mpg = car.getCombinationMpg();
        this.cylinders = car.getCylinders();
        this.displacement = car.getDisplacement();
        this.drive = car.getDrive();
        this.highway_mpg = car.getHighwayMpg();
        this.transmission = car.getTransmission();
    }

    // Getters (No need for setters if immutable)
    public String getMake() { return make; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public String getFuel_type() { return fuel_type; }
    public String getCar_class() { return car_class; }
    public int getCity_mpg() { return city_mpg; }
    public int getCombination_mpg() { return combination_mpg; }
    public int getCylinders() { return cylinders; }
    public double getDisplacement() { return displacement; }
    public String getDrive() { return drive; }
    public int getHighway_mpg() { return highway_mpg; }
    public String getTransmission() { return transmission; }
}
