const profanity = ['shit', 'fuck', 'damn', 'hell', 'cunt', 'ass', 'piss', 'cock', 'dick', 'bitch', 'fucker', 'motherfucker', 'pissed', 'prick', 'pussy']

export const validate = ( charMin, charMax, string ) => {
    const error = {};
    const length = string.length;

    if (length < charMin) {
        error.msg = `Must be at least ${charMin} characters`
    } else if (length > charMax) {
        error.msg = `Cannot be more than ${charMax} characters`
    } else {
        const array = string.split(" ");
        const lowerCaseArray = array.map(word => (word.toLowerCase()))
        profanity.forEach(word => {
            if (lowerCaseArray.includes(word)) {
                error.msg = `Please remove "${word}" from the comment`
            }
        });
    }

    return error;
};