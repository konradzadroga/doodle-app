package app.rest_api.vote;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/votes")
public class VoteController {

    private VoteService voteService;

    @RequestMapping(method = RequestMethod.POST, path="/add/{id}")
    public ResponseEntity<VoteDTO> addVote(@PathVariable long id) {
        VoteDTO vote = voteService.addVote(id);

        return new ResponseEntity<>(vote, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path="/{id}")
    public ResponseEntity<GetVotesDTO> getVotesForProposedDate(@PathVariable long id) {
        GetVotesDTO votes = voteService.getVotesForProposedDate(id);

        return new ResponseEntity<>(votes, HttpStatus.OK);
    }

}
