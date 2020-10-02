package com.example.demo.entities;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_op",discriminatorType = DiscriminatorType.STRING,length = 1)
public abstract class Operations implements Serializable {
	@Id
	@GeneratedValue
	private Long code;
	private LocalDate dateCreation;
	private double montant;
	@ManyToOne
	@JoinColumn(name="code_cte")
	private Comptes compte;

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public LocalDate getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDate dateCreation) {
		this.dateCreation = dateCreation;
	}

	public double getMontant() {
		return montant;
	}

	public void setMontant(double montant) {
		this.montant = montant;
	}

	public Comptes getCompte() {
		return compte;
	}

	public void setCompte(Comptes compte) {
		this.compte = compte;
	}

	public Operations( LocalDate dateCreation, double montant, Comptes compte) {
		super();
		this.dateCreation = dateCreation;
		this.montant = montant;
		this.compte = compte;
	}

	public Operations() {
		super();
		// TODO Auto-generated constructor stub
	}
}
