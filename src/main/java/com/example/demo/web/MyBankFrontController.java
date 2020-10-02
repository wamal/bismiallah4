package com.example.demo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/myBank")
public class MyBankFrontController {
	@RequestMapping("/hanoi")
	String welcome() {
		return "welcom";
	}
	@RequestMapping("/dragNdrop")
	String dragNdrop() {
		return "dragNdrop";
	}
	@RequestMapping("/simpleAnimation")
	String simpleAnimation() {
		return "simpleAnimation";
	}
	@RequestMapping("/debounce")
	String debounce() {
		return "debounce";
	}
	@RequestMapping("/hanoiIn")
	String hanoiIn() {
		return "hanoiTowerInternet/hanoiTowerInternet";
	}
	
	@RequestMapping("/hanoiImp")
	String hanoiImp() {
		return "hanoiImpVersion/hanoiImpVer";
	}
}
