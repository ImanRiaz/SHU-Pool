package com.login.demo.service;

import com.login.demo.model.ContactMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    private final File file;
    private final ObjectMapper mapper = new ObjectMapper();

    public ContactService() {
        String userHome = System.getProperty("user.home");
        File dataDir = new File(userHome, "shu-pool-data");

        if (!dataDir.exists()) dataDir.mkdirs(); // create folder if missing

        this.file = new File(dataDir, "contactMessages.json");
        System.out.println("CONTACT MESSAGES JSON PATH → " + file.getAbsolutePath());

        // Initialize file if it doesn't exist
        if (!file.exists()) {
            try {
                mapper.writeValue(file, new ArrayList<ContactMessage>());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // Read existing messages from JSON
    private List<ContactMessage> readMessages() {
        try {
            return mapper.readValue(file, new TypeReference<List<ContactMessage>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    // Save messages to JSON
    private void saveMessages(List<ContactMessage> messages) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, messages);
            System.out.println("Saved " + messages.size() + " contact messages to JSON");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Add new contact message
    public synchronized String saveMessage(ContactMessage msg) {
        if (msg.getEmail() == null || msg.getEmail().isEmpty())
            return "Email is required.";

        List<ContactMessage> messages = readMessages();
        messages.add(msg);
        saveMessages(messages);

        return "Message sent successfully!";
    }
}
