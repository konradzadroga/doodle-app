package app.rest_api.meeting;

import app.rest_api.date.AddProposedDateDTO;
import app.rest_api.date.ProposedDate;
import app.rest_api.date.ProposedDateService;
import app.rest_api.user.User;
import app.rest_api.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
@AllArgsConstructor
public class MeetingService {

    private MeetingRepository meetingRepository;
    private UserService userService;
    private ProposedDateService proposedDateService;

    public List<MeetingDTO> findAllMeetings() {
        List<Meeting> meetings = meetingRepository.findAll();
        List<MeetingDTO> meetingDTOs = new ArrayList<>();
        meetings.forEach(meeting -> meetingDTOs.add(new MeetingDTO(meeting)));

        return meetingDTOs;
    }

    public Meeting findMeetingById(long id) {
        Meeting meeting = meetingRepository.findDistinctById(id)
                .orElseThrow(() -> {
                    throw new NoSuchElementException("Meeting not found");
                });

        return meeting;
    }

    public MeetingDTO findMeetingDTOById(long id) {
        Meeting meeting = findMeetingById(id);
        MeetingDTO meetingDTO = new MeetingDTO(meeting);

        return meetingDTO;
    }


    public List<MeetingDTO> findAllMeetingsByUser(String username, String username2) {
        List<Meeting> meetings = meetingRepository.findAllByUsersUsernameAndOrganizerUsernameNotLike(username, username2);
        List<MeetingDTO> meetingDTOs = new ArrayList<>();

        meetings.forEach(meeting -> {
                meetingDTOs.add(new MeetingDTO(meeting));
        });

        return meetingDTOs;
    }


    public List<MeetingDTO> findAllMeetingsByOrganizer(String username) {
        List<Meeting> meetings = meetingRepository.findAllByOrganizerUsername(username);
        List<MeetingDTO> meetingDTOs = new ArrayList<>();

        meetings.forEach(meeting -> {
            meetingDTOs.add(new MeetingDTO(meeting));
        });

        return meetingDTOs;
    }

    public MeetingDTO addMeeting(AddMeetingDTO addMeetingDTO) throws ParseException {

        String name = addMeetingDTO.getName();
        String location = addMeetingDTO.getLocation();
        String description = addMeetingDTO.getDescription();

        List<String> usernames = addMeetingDTO.getUsernames();
        List<User> users = new ArrayList<>();

        for (String username : usernames) {
            User user = userService.findUserByUsername(username);
            users.add(user);
        }

        User organizer = userService.findCurrentUser();
        String organizerUsername = organizer.getUsername();

        Meeting meeting = new Meeting(name, location, description, users, organizer);

        Date proposedStartDate = addMeetingDTO.getProposedStartDate();
        int proposedStartTime = addMeetingDTO.getProposedStartTime();
        int proposedEndTime = addMeetingDTO.getProposedEndTime();
        meeting = meetingRepository.save(meeting);

        ProposedDate proposedDate = new ProposedDate(proposedStartDate, proposedStartTime, proposedEndTime, meeting, organizer);
        proposedDate = proposedDateService.saveProposedDate(proposedDate);

        List<ProposedDate> proposedDates = new ArrayList<>();
        proposedDates.add(proposedDate);
        meeting.setProposedDates(proposedDates);

        MeetingDTO meetingDTO = new MeetingDTO(meeting);


        return meetingDTO;
    }

    public MeetingDTO addProposedDateToMeeting(long meetingId, AddProposedDateDTO proposedDateDTO) {
        Meeting meeting = findMeetingById(meetingId);
        Date proposedStartDate = proposedDateDTO.getProposedStartDate();
        int proposedStartTime = proposedDateDTO.getProposedStartTime();
        int proposedEndTime = proposedDateDTO.getProposedEndTime();
        User proponent = userService.findCurrentUser();

        ProposedDate proposedDate = proposedDateService.findByMeetingIdAndUsername(meetingId, proponent.getUsername());

        if (proposedDate == null) {
            proposedDate = new ProposedDate(proposedStartDate, proposedStartTime, proposedEndTime, meeting, proponent);
        } else {
            proposedDate.setProposedStartDate(proposedStartDate);
            proposedDate.setProposedStartTime(proposedStartTime);
            proposedDate.setProposedEndTime(proposedEndTime);
        }

        proposedDateService.saveProposedDate(proposedDate);

        MeetingDTO meetingDTO = new MeetingDTO(meeting);

        return meetingDTO;
    }



    public MeetingDTO setMeetingAsConfirmed(long meetingId, long proposedDateId) {
        Meeting meeting = findMeetingById(meetingId);
        ProposedDate proposedDate = proposedDateService.findById(proposedDateId);
        meeting.setConfirmed(true);
        meeting.setConfirmedStartDate(proposedDate.getProposedStartDate());
        meeting.setConfirmedStartTime(proposedDate.getProposedStartTime());
        meeting.setConfirmedEndTime(proposedDate.getProposedEndTime());

        meeting = meetingRepository.save(meeting);
        MeetingDTO meetingDTO = new MeetingDTO(meeting);

        return meetingDTO;
    }

    List<GetOccupiedDatesDTO> findOccupiedDatesByDateAndUsers(FindOccupiedDatesDTO findOccupiedDatesDTO) {
        List<String> usernames = findOccupiedDatesDTO.getUsernames();
        Date date = findOccupiedDatesDTO.getDate();
        List<Meeting> meetings = new ArrayList<>();
        List<GetOccupiedDatesDTO> occupiedDates = new ArrayList<>();

        for (String username: usernames) {
            meetings.addAll(meetingRepository.findAllByConfirmedTrueAndConfirmedStartDateAndUsersUsername(date, username));
        }

        meetings.forEach(meeting -> {
            GetOccupiedDatesDTO occupiedDate = new GetOccupiedDatesDTO(meeting.getConfirmedStartTime(), meeting.getConfirmedEndTime());
            if (occupiedDates.contains(occupiedDate)) { } else {
                occupiedDates.add(occupiedDate);
            }
        });

        return occupiedDates;
    }

     List<GetFreeTimeSlotsDTO> findFreeTimeSlots(FindOccupiedDatesDTO findOccupiedDatesDTO) {
        List<GetOccupiedDatesDTO> occupiedDates = findOccupiedDatesByDateAndUsers(findOccupiedDatesDTO);
        boolean timeSlots[];
        timeSlots = new boolean[2401];

        boolean hourTimeSlots[];
        hourTimeSlots = new boolean[96];

        int time[];
        time = new int[96];

        int z=0;
        int y=1;
        for (int i=0; i<96; i++) {
            time[i] = z;
            if (y==4) {
                y=0;
                z+=55;
            } else {
                z+=15;
            }
            y++;
        }

        Arrays.fill(timeSlots, true);
        Arrays.fill(hourTimeSlots, true);

        occupiedDates.forEach(occupiedDate -> {
            int startTime = occupiedDate.getConfirmedStartTime();
            int endTime = occupiedDate.getConfirmedEndTime();

            for (int i=startTime; i<endTime; i++) {
                //if taken then false
                timeSlots[i] = false;
            }
        });

        z=0;
        y=0;
        for (int i=0; i<96; i++) {
            boolean allFree = false;
            int k=0;
            for (int j=z; j<z+15; j++) {
                if (timeSlots[j]==true) k++;
            }
            if (k>=14) allFree = true;
            if (!allFree) hourTimeSlots[i]=false;
            y++;
            if (y==4) {
                y=0;
                z+=55;
            } else {
                z+=15;
            }
        }

        List<GetFreeTimeSlotsDTO> timeSlotsDTOs = new ArrayList<>();

        for (int i=0; i<96; i++) {
            timeSlotsDTOs.add(new GetFreeTimeSlotsDTO(time[i], hourTimeSlots[i]));
        }

        return timeSlotsDTOs;
    }


    }
