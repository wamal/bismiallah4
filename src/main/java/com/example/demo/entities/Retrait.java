package com.example.demo.entities;

import java.time.LocalDate;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("R")
public class Retrait extends Operations{
	
	public Retrait() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Retrait( LocalDate dateCreation, double montant, Comptes compte) {
		super(dateCreation, montant, compte);
	
	}
}
