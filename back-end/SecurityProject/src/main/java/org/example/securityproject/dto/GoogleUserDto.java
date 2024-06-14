package org.example.securityproject.dto;

public class GoogleUserDto {
    private String idToken;
    private String id;
    private String name;
    private String email;
    private String photoUrl;
    private String firstName;
    private String lastName;
    private String provider;

    // Default constructor
    public GoogleUserDto() {}

    // Constructor with parameters
    public GoogleUserDto(String idToken, String id, String name, String email, String photoUrl, String firstName, String lastName, String provider) {
        this.idToken = idToken;
        this.id = id;
        this.name = name;
        this.email = email;
        this.photoUrl = photoUrl;
        this.firstName = firstName;
        this.lastName = lastName;
        this.provider = provider;
    }

    // Getters and Setters
    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
