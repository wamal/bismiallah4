package com.example.demo.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
@Entity
public class Clients implements Serializable {
	@Id @GeneratedValue
	private Long code;
	private String name;
	private String email;
	@OneToMany(mappedBy = "client",fetch = FetchType.EAGER,cascade = {CascadeType.ALL,CascadeType.PERSIST, CascadeType.MERGE})
	private Set<Comptes> comptes;

	public Clients() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Clients(String name, String email) {
		super();
		this.name = name;
		this.email = email;
	}

	public Long getcode() {
		return code;
	}

	public void setcode(Long code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<Comptes> getComptes() {
		return comptes;
	}

	public void setComptes(Set<Comptes> comptes) {
		this.comptes = comptes;
	}

}
