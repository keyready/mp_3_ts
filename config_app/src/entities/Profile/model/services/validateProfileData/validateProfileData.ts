import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) return [ValidateProfileError.NO_DATA];

    const {
        firstname,
        lastname,
        age,
    } = profile;
    const errors: ValidateProfileError[] = [];

    if (!lastname || !firstname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    // eslint-disable-next-line no-bitwise
    if (!age || ~~age < 0 || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AGE);
    }

    return errors;
};
