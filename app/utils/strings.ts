
export const isValidString = (rawString: unknown): rawString is string => typeof rawString == 'string' && rawString.trim().length > 0
