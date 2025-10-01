import { EventType } from "../component/enum/event.type.enum";

export interface Events{

    id: number;
    type: EventType;
    description: string;
    device:string;
    ipAddress:string;
    createdAt:Date;
}