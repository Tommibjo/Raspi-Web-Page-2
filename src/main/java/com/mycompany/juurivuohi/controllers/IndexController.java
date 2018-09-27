/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.juurivuohi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author tommib
 */
@Controller
public class IndexController {
    
    @RequestMapping("/")
    public String showHome(){
        return "index";
    }
    
    @RequestMapping("/about")
    public String showAbout(){
        return "about";
    }
    
    @RequestMapping("/cvdb")
    public String showDb(){
        return "cvdb";
    }
    
    @RequestMapping("/login")
    public String showLogin(){
        return "login";
    }
}
