package app.rest_api.user;

import app.rest_api.vote.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import app.rest_api.role.Role;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=40)
    private String username;

    @NotBlank
    @Size(min=6)
    @JsonIgnore
    private String password;

    @NotBlank
    @Size(max=30)
    private String name;

    @NotBlank
    @Size(max=35)
    private String surname;

    @Email
    @Size(max=60)
    private String email;

    @ManyToMany
    private Set<Role> roles;

    @OneToMany(mappedBy = "voter")
    List<Vote> votes;


    public User(@NotBlank @Size(max = 40) String username, @NotBlank @Size(min = 6) String password, @NotBlank @Size(max = 30) String name, @NotBlank @Size(max = 35) String surname, @Email @Size(max = 60) String email) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}
