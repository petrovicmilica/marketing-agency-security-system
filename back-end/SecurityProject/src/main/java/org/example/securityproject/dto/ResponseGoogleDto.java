package org.example.securityproject.dto;

public class ResponseGoogleDto {
    private String responseMessage;
    private boolean flag;
    private String googleEmail;
    private String loginPassword;

    public ResponseGoogleDto() {
    }

    public ResponseGoogleDto(String responseMessage, boolean flag, String googleEmail, String loginPassword) {
        this.responseMessage = responseMessage;
        this.flag = flag;
        this.googleEmail = googleEmail;
        this.loginPassword = loginPassword;
    }

    public String getGoogleEmail() {
        return googleEmail;
    }

    public void setGoogleEmail(String googleEmail) {
        this.googleEmail = googleEmail;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }
}
