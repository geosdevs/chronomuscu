export function secondsToPrettyString(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const minutesStr = minutes > 0 ? `${minutes}min` : '';
    const secondsStr = secondsLeft > 0 ? `${secondsLeft}s` : ''
    return minutesStr + secondsStr;
}