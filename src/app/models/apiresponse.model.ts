import { AverageWaiting } from "./averagewaiting.model";
import { Branch } from "./branch.model";
import { Counter } from "./counter.model";
import { Customer } from "./customer.model";
import { Happiness } from "./happiness.model";
import { PeakHours } from "./peakHours.model";
import { Served } from "./served.model";
import { ServedWaiting } from "./servedwaiting.model";

export interface APIResponse{

    avgWatData : AverageWaiting;
    avgTrtData : AverageWaiting;
    servedData : Served[];
    branchData : Branch[];
    servedWaiting : ServedWaiting[];
    counterData : Counter;
    customerData : Customer;
    happinessData : Happiness;
    peakHours : PeakHours[];
}