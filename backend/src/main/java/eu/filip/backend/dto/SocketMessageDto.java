package eu.filip.backend.dto;

public class SocketMessageDto {
    private String sender_id;
    private String message;

    public SocketMessageDto(String sender_id, String message) {
        this.sender_id = sender_id;
        this.message = message;
    }

    public String getSender_id() {
        return sender_id;
    }

    public void setSender_id(String sender_id) {
        this.sender_id = sender_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
