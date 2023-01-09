import { Award } from './Award';

export interface AwardSchema {
    data?: Award[];
    isLoading: boolean;
    error?: string;
}
