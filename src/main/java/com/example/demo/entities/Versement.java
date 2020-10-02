package com.example.demo.entities;

import java.time.LocalDate;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("V")
public class Versement extends Operations{

	public Versement() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Versement(LocalDate dateCreation, double montant, Comptes compte) {
		super(dateCreation, montant, compte);
		// TODO Auto-generated constructor stub
	}

}
