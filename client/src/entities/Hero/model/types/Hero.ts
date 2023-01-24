import { User } from 'entities/User';
import { Award } from 'entities/Award/model/types/Award';

export interface Hero {
    id: number;
    // user: User;
    userId: number;
    middlename?: string;
    firstname?: string;
    lastname?: string;
    story?: string;
    rank?: string;
    photo?: string;
    awards?: Award[];
}
