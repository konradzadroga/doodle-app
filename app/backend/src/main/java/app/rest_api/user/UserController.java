package app.rest_api.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, path = "/current")
    public ResponseEntity<UserDTO> getCurrentUser() {
        UserDTO user = userService.getCurrentUser();

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/usernames")
    public ResponseEntity<List<String>> findAllUsers() {
        List<String> usernames = userService.findAllUsernames();

        return new ResponseEntity<>(usernames, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{username}")
    public ResponseEntity<UserDTO> findUserByUsername(@PathVariable String username) {
        UserDTO user = userService.findUserDTOByUsername(username);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
