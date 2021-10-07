import { Served } from "./served.model";

export interface AverageWaiting{

    time : number;
    top5 : Served[];
}