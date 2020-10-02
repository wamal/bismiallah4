package com.example.demo.metiers;

import java.time.LocalDate;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dao.ClientRep;
import com.example.demo.dao.ComptesRep;
import com.example.demo.dao.OperationRep;
import com.example.demo.entities.Comptes;
import com.example.demo.entities.ComptesCourants;
import com.example.demo.entities.Operations;
import com.example.demo.entities.Retrait;
import com.example.demo.entities.Versement;
@Transactional
@Service
public class BankImpl implements BankMetier{
	@Autowired
	ClientRep cliRep;
	@Autowired
	OperationRep opRep;
	@Autowired
	ComptesRep cptRep;
	@Override
	public Comptes consulterCompte(String codeCompte) {
		// TODO Auto-generated method stub
		Comptes cpt=cptRep.findById(codeCompte).get();
		if (cpt==null) throw new RuntimeException("compte introuvable");
		return cpt ;
	}

	@Override
	public void verser(double montant, String codeCompte,LocalDate date) {
Comptes cpt=this.consulterCompte(codeCompte);
		cpt.setSolde(this.consulterCompte(codeCompte).getSolde()+montant);
		cptRep.save(this.consulterCompte(codeCompte));
		opRep.save(new Versement(date,montant,this.consulterCompte(codeCompte)));
	}

	@Override
	public void retirer(double montant, String codeCompte,LocalDate date) {
		// TODO Auto-generated method stub
		Comptes cpt=this.consulterCompte(codeCompte);
		
		boolean  facilite;
		if (cpt instanceof ComptesCourants) {
			ComptesCourants cptcc=(ComptesCourants)cpt;
			facilite=cptcc.getDecouverte()+cptcc.getSolde()>montant;}
		
		else facilite=cpt.getSolde()>montant;
		
		if (!facilite) throw new RuntimeException("solde insuffisant");
			cpt.setSolde(this.consulterCompte(codeCompte).getSolde()-montant);
		cptRep.save(this.consulterCompte(codeCompte));
		opRep.save(new Retrait(date,montant,this.consulterCompte(codeCompte)));
	}

	@Override
	public void virer(double montant, String compteSource, String compteDestination,LocalDate date) {
		
	this.verser(montant, compteDestination,date);
	this.retirer(montant, compteSource,date);
	cptRep.save(this.consulterCompte(compteSource));
	cptRep.save(this.consulterCompte(compteDestination));
		
	}

	@Override
	public Page<Operations> operationListByAccountId(String codeCompte, int p, int size) {
		Pageable pl=PageRequest.of(p,size);
		return opRep.listOfOper(codeCompte, pl);
	}
}
