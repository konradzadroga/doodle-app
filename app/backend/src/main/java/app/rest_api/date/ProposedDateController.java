package app.rest_api.date;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RequestMapping("/dates")
@RestController
public class ProposedDateController {

    private ProposedDateService proposedDateService;

}
