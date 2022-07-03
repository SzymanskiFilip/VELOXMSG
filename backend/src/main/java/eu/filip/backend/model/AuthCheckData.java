package eu.filip.backend.model;

public class AuthCheckData {
    private String token;

    public AuthCheckData(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
