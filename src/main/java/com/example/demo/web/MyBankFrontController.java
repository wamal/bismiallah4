package com.example.demo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/hanoi")
public class MyBankFrontController {

	@RequestMapping("/hanoiImpoo")
	String hanoiImp() {
		return "index";
	}
}
