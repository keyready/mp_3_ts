import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) return [ValidateProfileError.NO_DATA];

    const {
        first,
        lastname,
        age,
    } = profile;
    const errors: ValidateProfileError[] = [];

    if (!lastname || !first) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!age || age < 0 || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AGE);
    }

    return errors;
};
