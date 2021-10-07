import { ServedWaitingDepartmentData } from "./servedandwaitingdeptdata.model";

export interface ServedWaitingDepartment{

    id : number,
    name : string,
    data : ServedWaitingDepartmentData[]
}