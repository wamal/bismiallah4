package com.example.demo.entities;

import java.time.LocalDate;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("CE")
public class ComptesEpargne extends Comptes {
	private double taux;

	public ComptesEpargne() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ComptesEpargne(String id, LocalDate dateCreation, double solde, Clients client) {
		super(id, dateCreation, solde, client);
		// TODO Auto-generated constructor stub
	}

	public ComptesEpargne(String id, LocalDate dateCreation, double solde, Clients client, double taux) {
		super(id, dateCreation, solde, client);
		this.taux = taux;
	}

	public double getTaux() {
		return taux;
	}

	public void setTaux(double taux) {
		this.taux = taux;
	}

}
