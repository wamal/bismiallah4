package com.example.demo.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;

import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_cpt",discriminatorType = DiscriminatorType.STRING,length = 2)
public abstract class  Comptes implements Serializable {
	@Id
	private String code;
	private LocalDate dateCreation;
	private double solde;
	@ManyToOne(fetch= FetchType.EAGER,cascade = {CascadeType.ALL,CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name="code_cli")
	private Clients client;
	@OneToMany(mappedBy = "compte")
	private Collection<Operations> operations;

	public String getcode() {
		return code;
	}

	public void setcode(String code) {
		this.code = code;
	}

	public LocalDate getDateCreation() {
		return dateCreation;
	}

	public void  setDateCreation(LocalDate dateCreation) {
		this.dateCreation = dateCreation;
	}

	public double getSolde() {
		return solde;
	}

	public void setSolde(double solde) {
		this.solde = solde;
	}

	public Clients getClient() {
		return client;
	}

	public void setClient(Clients client) {
		this.client = client;
	}

	public Collection<Operations> getOperations() {
		return operations;
	}

	public void setOperations(Collection<Operations> operations) {
		this.operations = operations;
	}

	public Comptes(String code, LocalDate dateCreation, double solde, Clients client) {
		super();
		this.code = code;
		this.dateCreation = dateCreation;
		this.solde = solde;
		this.client = client;
	}

	public Comptes() {
		super();
		// TODO Auto-generated constructor stub
	}
}
