package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Clients;

public interface ClientRep extends JpaRepository<Clients, Long>{

}
