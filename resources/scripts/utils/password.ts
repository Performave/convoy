export enum StrengthEnum {
    WEAK = 'Weak',
    MEDIUM = 'Medium',
    STRONG = 'Strong',
}

export interface StrengthResult {
    criteria: {
        minLength: boolean
        uppercase: boolean
        lowercase: boolean
        number: boolean
        specialChar: boolean
    }
    strength: StrengthEnum
}

export const calculatePasswordStrength = (pwd: string): StrengthResult => {
    const strengthCriteria = {
        minLength: /.{12,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    }

    const result = {
        minLength: strengthCriteria.minLength.test(pwd),
        uppercase: strengthCriteria.uppercase.test(pwd),
        lowercase: strengthCriteria.lowercase.test(pwd),
        number: strengthCriteria.number.test(pwd),
        specialChar: strengthCriteria.specialChar.test(pwd),
    }

    const passedCount = Object.values(result).filter(Boolean).length

    let strength: StrengthEnum
    if (passedCount <= 2) strength = StrengthEnum.WEAK
    else if (passedCount === 3) strength = StrengthEnum.MEDIUM
    else strength = StrengthEnum.STRONG

    return {
        criteria: result,
        strength,
    }
}
