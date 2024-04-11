import { format } from "date-fns";

export const createDate = (time) => {
    let dateTime = new Date(time);
    return format(dateTime, "yyyy-MM-dd hh.mm.ss")
    };