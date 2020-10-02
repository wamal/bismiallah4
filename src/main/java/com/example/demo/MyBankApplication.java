package com.example.demo;


import java.time.LocalDate;
import java.time.Month;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.example.demo.dao.ClientRep;
import com.example.demo.dao.ComptesRep;
import com.example.demo.dao.OperationRep;
import com.example.demo.entities.Clients;
import com.example.demo.entities.Comptes;
import com.example.demo.entities.ComptesCourants;
import com.example.demo.entities.ComptesEpargne;
import com.example.demo.entities.Operations;
import com.example.demo.metiers.BankMetier;

@SpringBootApplication
public class MyBankApplication implements CommandLineRunner {
	@Autowired
	BankMetier bkImp;
	@Autowired
	ClientRep cliRep;
	@Autowired
	OperationRep opRep;
	@Autowired
	ComptesRep cptRep;

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(MyBankApplication.class, args);
		// ClientRep cliRep = ctx.getBean(ClientRep.class);

	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		Clients fahd = new Clients("Fahd", "fahd@gmail.com");
		Clients ahmed = new Clients("Ahmed", "ahmed@gmail.com");

		LocalDate date1 = LocalDate.of(2001, Month.AUGUST, 24);

		LocalDate date2 = LocalDate.of(2004, Month.DECEMBER, 23);
		LocalDate date3 = LocalDate.of(2020, Month.DECEMBER, 23);
		LocalDate date4 = LocalDate.of(2019, Month.DECEMBER, 23);

		Comptes cpt1Ahmed = new ComptesCourants("cpt1Ahmed", date1, 20000, ahmed, 10000);

		Comptes cpt2Ahmed = new ComptesCourants("cpt2Ahmed", date2, 30000, ahmed, 30000);
		Comptes cpt3Ahmed = new ComptesEpargne("cpt3Ahmed", date2, 30000, ahmed, 5.5);
		Comptes cpt1Fahd = new ComptesCourants("cpt1Fahd", date1, 50000, fahd, 10000);
		Comptes cpt2Fahd = new ComptesEpargne("cpt2Fahd", date2, 60000, fahd, 2.5);

		cliRep.save(ahmed);
		cliRep.save(fahd);
		cptRep.save(cpt1Ahmed);

		cptRep.save(cpt2Ahmed);
		cptRep.save(cpt3Ahmed);
		cptRep.save(cpt1Fahd);
		cptRep.save(cpt2Fahd);

		bkImp.verser(2000, "cpt1Ahmed", date1);

		bkImp.verser(1000, "cpt2Ahmed", date1);
		bkImp.retirer(1000, "cpt3Ahmed", date2);
		bkImp.virer(3000, "cpt1Ahmed", "cpt1Fahd", date3);
		bkImp.virer(28000, "cpt1Ahmed", "cpt1Fahd", date3);
		
Pageable p=PageRequest.of(0,8);
		Page<Operations> po=bkImp.operationListByAccountId("cpt1Fahd", 0,8 );
		for (Operations pp:po)
		System.out.println(pp.getMontant());
	}
}
