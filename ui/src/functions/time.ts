type SECONDS_FORMAT = typeof SECONDS_FORMAT_STANDARD 
    | typeof SECONDS_FORMAT_TIMER;

export const SECONDS_FORMAT_STANDARD = 'standard';
export const SECONDS_FORMAT_TIMER = 'timer';

export function secondsToPrettyString(
    seconds: number, 
    format: SECONDS_FORMAT = SECONDS_FORMAT_STANDARD) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    let minutesStr;
    let secondsStr = secondsLeft.toString();

    if (minutes > 0) {
        secondsStr = secondsStr.padStart(2, '0')
    }

    switch(format) {
        case SECONDS_FORMAT_TIMER:
            minutesStr = minutes > 0 ? `${minutes}:` : '';
            break;
        case SECONDS_FORMAT_STANDARD:
        default:
            minutesStr = minutes > 0 ? `${minutes}min` : '';
            secondsStr += 's';
    }

    return minutesStr + secondsStr;
}
