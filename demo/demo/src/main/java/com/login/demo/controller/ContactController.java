package com.login.demo.controller;

import com.login.demo.model.ContactMessage;
import com.login.demo.service.ContactService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // Allow frontend requests
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/submit")
    public String submitContact(@RequestBody ContactMessage msg) {
        System.out.println("=== CONTACT FORM SUBMISSION ===");
        System.out.println("From: " + msg.getName() + " (" + msg.getEmail() + ")");
        return contactService.saveMessage(msg);
    }
}
