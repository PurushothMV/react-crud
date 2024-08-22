package com.example.demoapi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demoapi.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}


