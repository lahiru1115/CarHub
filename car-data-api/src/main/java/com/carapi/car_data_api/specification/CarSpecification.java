package com.carapi.car_data_api.specification;

import com.carapi.car_data_api.model.Car;
import org.springframework.data.jpa.domain.Specification;

public class CarSpecification {

    public static Specification<Car> filterBy(String make, String model, Integer year, String fuelType) {
        return (root, query, criteriaBuilder) -> {
            Specification<Car> spec = Specification.where(null);

            if (make != null && !make.isEmpty()) {
                spec = spec.and((root1, query1, cb) -> cb.equal(root1.get("make"), make));
            }
            if (model != null && !model.isEmpty()) {
                spec = spec.and((root1, query1, cb) -> cb.equal(root1.get("model"), model));
            }
            if (year != null && year != 0) {
                spec = spec.and((root1, query1, cb) -> cb.equal(root1.get("year"), year));
            }
            if (fuelType != null && !fuelType.isEmpty()) {
                spec = spec.and((root1, query1, cb) -> cb.equal(root1.get("fuelType"), fuelType));
            }

            return spec.toPredicate(root, query, criteriaBuilder);
        };
    }
}
