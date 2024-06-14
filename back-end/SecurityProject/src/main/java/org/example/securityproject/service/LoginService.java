package org.example.securityproject.service;

import lombok.AllArgsConstructor;
import org.example.securityproject.model.LoginToken;
import org.example.securityproject.model.User;
import org.example.securityproject.repository.LoginTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;


@Service
@AllArgsConstructor
public class LoginService {

    @Autowired
    private EmailService emailService;
    private UserDataEncryptionService userDataEncryptionService;

    public void sendEmail(String email) throws NoSuchAlgorithmException, InvalidKeyException {
        // Ovde pozovite sendPasswordlessMail metodu iz EmailService
        emailService.sendPasswordlessMail(email);
    }

    public String getLoginPassword(String plainEmail) throws Exception {
        User encryptedUser = userDataEncryptionService.findEncryptedUserByEmail(plainEmail);
        System.out.println("ENKRIPTOVAN USER POSTOJI::: " + encryptedUser.getEmail());
        System.out.println("LOZINKA:::: " + encryptedUser.getPassword());
        return encryptedUser.getPassword();
    }
}
