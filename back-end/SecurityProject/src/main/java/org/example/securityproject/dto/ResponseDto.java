package org.example.securityproject.dto;

public class ResponseDto {
    private String responseMessage;
    private boolean flag;

    public ResponseDto() {
    }

    public ResponseDto(String responseMessage, boolean flag) {
        this.responseMessage = responseMessage;
        this.flag = flag;
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
}
