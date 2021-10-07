import { PeakHours } from "./peak-hours.model";

export interface PeakHoursReport{
    day : string;
    data : PeakHours[];
}