import { User } from 'entities/User';
import { Award } from 'entities/Award/model/types/Award';

export interface Hero {
    awards?: Award[];
    // user: User;
    firstname?: string;
    id: number;
    lastname?: string;
    middlename?: string;
    photo?: string;
    rank?: string;
    story?: string;
    userId: User;
}
