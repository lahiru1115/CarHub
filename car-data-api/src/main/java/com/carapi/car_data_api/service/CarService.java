package com.carapi.car_data_api.service;

import com.carapi.car_data_api.dto.CarResponseDto;
import com.carapi.car_data_api.model.Car;
import com.carapi.car_data_api.repository.CarRepository;
import com.carapi.car_data_api.specification.CarSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public Page<CarResponseDto> getCars(String make, String model, Integer year, String fuelType, int limit) {
        Specification<Car> spec = CarSpecification.filterBy(make, model, year, fuelType);
        PageRequest pageable = PageRequest.of(0, limit);

        Page<Car> carPage = carRepository.findAll(spec, pageable);

        List<CarResponseDto> carsDtoList = carPage.getContent().stream()
                .map(CarResponseDto::new)
                .collect(Collectors.toList());

        return new PageImpl<>(carsDtoList, pageable, carPage.getTotalElements());
    }
}