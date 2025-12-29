package com.carapi.car_data_api.controller;

import com.carapi.car_data_api.dto.CarResponseDto;
import com.carapi.car_data_api.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/api/v1/cars")
    public Map<String, Object> getCars(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String fuel_type,
            @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> response = new HashMap<>();

        try {
            Page<CarResponseDto> carPage = carService.getCars(make, model, year, fuel_type, limit);
            long totalRecords = carPage.getTotalElements();

            if (totalRecords > 0) {
                response.put("message", "Cars fetched successfully");
            } else {
                response.put("message", "No cars available");
            }

            response.put("data", carPage.getContent());
            response.put("total", totalRecords);

        } catch (Exception e) {
            response.put("message", "An error occurred. Please try again later.");
            // response.put("error", e.getMessage());
        }

        return response;
    }
}
