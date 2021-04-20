package app.config.message.request;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String email;
    private String pesel;
    private Date birthdate;
    private String city;
    private String postcode;
    private String street;
    private int streetNumber;
    private int localNumber;
    private Set<String> roles;
}
