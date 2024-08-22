package com.example.demoapi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoapi.model.Person;
import com.example.demoapi.service.PersonService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping(path = "/getAllPersons")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id) {
        Optional<Person> person = personService.getPersonById(id);
        return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(path = "/save")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person createdPerson = personService.savePerson(person);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPerson);
    }

    @PutMapping(path = "/update")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person person) {
        if (!personService.getPersonById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        person.setId(id);
        Person updatedPerson = personService.savePerson(person);
        return ResponseEntity.ok(updatedPerson);
    }

    @DeleteMapping(path = "/deleteperson/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        if (!personService.getPersonById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }
}

