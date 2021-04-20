import { ProposedDateDTO } from "./date.model";
import { UserDTO } from "./user.model";

export interface AddMeetingDTO {
    name: string;
    location: string;
    description: string;
    usernames: string[];
    proposedStartDate: Date;
    proposedStartTime: number;
    proposedEndTime: number;
}

export interface FindOccupiedDatesDTO {
    date: Date;
    usernames: string[];
}

export interface GetFreeTimeSlotsDTO {
    time: number;
    timeSlotFree: boolean;
}

export interface MeetingDTO {
    id: number;
    name: string;
    location: string;
    description: string;
    confirmedStartDate: Date;
    confirmedStartTime: number;
    confirmedEndTime: number;
    confirmed: boolean;
    users: UserDTO[];
    organizer: UserDTO;
    proposedDateDTOs: ProposedDateDTO[];   
}