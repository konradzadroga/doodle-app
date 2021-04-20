package app.rest_api.meeting;

import app.rest_api.date.AddProposedDateDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@AllArgsConstructor
@RequestMapping("/meetings")
@RestController
public class MeetingController {

    private MeetingService meetingService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<MeetingDTO>> findAllMeetings() {
        List<MeetingDTO> meetings = meetingService.findAllMeetings();

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET, path = "/user/{username}")
    public ResponseEntity<List<MeetingDTO>> findAllMeetingsByUser2(@PathVariable String username) {
        List<MeetingDTO> meetings = meetingService.findAllMeetingsByUser(username, username);

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/organizer/{username}")
    public ResponseEntity<List<MeetingDTO>> findAllMeetingsByOrganizer(@PathVariable String username) {
        List<MeetingDTO> meetings = meetingService.findAllMeetingsByOrganizer(username);

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<MeetingDTO> findMeetingById(@PathVariable long id) {
        MeetingDTO meeting = meetingService.findMeetingDTOById(id);

        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, path = "/freeTimeSlots")
    public ResponseEntity<List<GetFreeTimeSlotsDTO>> findFreeTimeSlots(@RequestBody FindOccupiedDatesDTO findOccupiedDatesDTO) {
        List<GetFreeTimeSlotsDTO> timeSlots = meetingService.findFreeTimeSlots(findOccupiedDatesDTO);

        return new ResponseEntity<>(timeSlots, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<MeetingDTO> addMeeting(@RequestBody AddMeetingDTO addMeetingDTO) throws ParseException {
        MeetingDTO meeting = meetingService.addMeeting(addMeetingDTO);

        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}/addDate")
    public ResponseEntity<MeetingDTO> addProposedDateToMeeting(@PathVariable long id, @RequestBody AddProposedDateDTO proposedDateDTO) {
        MeetingDTO meeting = meetingService.addProposedDateToMeeting(id, proposedDateDTO);

        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{meetingId}/setConfirmed/{proposedDateId}")
    public ResponseEntity<MeetingDTO> setMeetingAsConfirmed(@PathVariable long meetingId, @PathVariable long proposedDateId) {
        MeetingDTO meeting = meetingService.setMeetingAsConfirmed(meetingId, proposedDateId);

        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }


}
