package com.example.demo.entities;

import java.time.LocalDate;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@Entity
@DiscriminatorValue("CC")
public class ComptesCourants extends Comptes {
private double decouverte;

public ComptesCourants() {
	super();
	// TODO Auto-generated constructor stub
}

public ComptesCourants(String id, LocalDate dateCreation, double solde, Clients client, double decouverte) {
	super(id, dateCreation, solde, client);
	this.decouverte = decouverte;
}

public double getDecouverte() {
	return decouverte;
}

public void setDecouverte(double decouverte) {
	this.decouverte = decouverte;
}

public ComptesCourants(String id, LocalDate dateCreation, double solde, Clients client) {
	super(id, dateCreation, solde, client);
	// TODO Auto-generated constructor stub
}
}
