package app.config.controller;

import app.config.message.request.RegisterDTO;
import app.config.message.response.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import app.rest_api.role.Role;
import app.rest_api.role.RoleName;
import app.rest_api.role.RoleRepository;
import app.rest_api.user.User;
import app.rest_api.user.UserRepository;

import java.util.HashSet;
import java.util.Set;

@RestController
public class RegisterController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;


    public RegisterController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping(value="signup", method= RequestMethod.POST)
    public ResponseEntity<?> signUp(@RequestBody RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("User with that username already exists"), HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("User with that e-mail already exists"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(registerDTO.getUsername(), passwordEncoder.encode(registerDTO.getPassword()), registerDTO.getName(), registerDTO.getSurname(),
                registerDTO.getEmail());

        Set<Role> roles = new HashSet<>();

        registerDTO.getRoles().forEach(role -> {
            switch(role) {
                case "ROLE_ADMIN":
                    Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Admin role not found"));
                    roles.add(adminRole);
                break;
                case "ROLE_USER":
                    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("User role not found"));
                    roles.add(userRole);
                    break;
                case "ROLE_INSTRUCTOR":
                    Role employeeRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE)
                            .orElseThrow(() -> new RuntimeException("Employee role not found"));
                    roles.add(employeeRole);
                    break;
            }
        });

        user.setRoles(roles);
        userRepository.save(user);


        return new ResponseEntity<>(new ResponseMessage("Rejestracja przebiegła pomyślnie"), HttpStatus.OK);
    }
}
