package com.example.demo.metiers;

import java.time.LocalDate;
import org.springframework.data.domain.Page;

import com.example.demo.entities.Comptes;
import com.example.demo.entities.Operations;

public interface BankMetier {
	public Comptes consulterCompte(String codeCompte);

	public void verser(double montant, String codeCompte,LocalDate date);

	public void retirer(double montant, String codeCompte,LocalDate date);

	public void virer(double montant, String compteSource, String compteDestination,LocalDate date);
	public Page<Operations> operationListByAccountId(String codeCompte,int p,int size );
}
