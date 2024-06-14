package org.example.securityproject.dto;

public class EmailDto {
    private String googleEmail;

    public EmailDto(String googleEmail) {
        this.googleEmail = googleEmail;
    }

    public EmailDto() {}

    public String getGoogleEmail() {
        return googleEmail;
    }

    public void setGoogleEmail(String googleEmail) {
        this.googleEmail = googleEmail;
    }
}
