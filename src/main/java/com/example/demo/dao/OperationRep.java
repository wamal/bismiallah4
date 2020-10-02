package com.example.demo.dao;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Operations;

public interface OperationRep extends JpaRepository<Operations, Long> {
	@Query("select o from Operations o where o.compte.code=:x order by o.dateCreation desc")
public Page<Operations> listOfOper(@Param("x")String codeCompte,Pageable p);
}
