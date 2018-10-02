/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.juurivuohi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 *
 * @author tommib
 */
@SpringBootApplication
public class Main /*extends SpringBootServletInitializer*/ { // tämä lisätty (POM.XML ja tänne tämä lisätty AINOASTAAN

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

}
