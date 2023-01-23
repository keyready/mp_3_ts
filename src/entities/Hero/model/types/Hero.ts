import { User } from 'entities/User';

export interface Hero {
    id: number;
    user: User;
    middlename?: string;
    firstname?: string;
    lastname?: string;
    story?: string;
    rank?: string;
    photo?: string;
}
