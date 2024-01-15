export function str2time(str) {
    return new Date(str).getTime();
}

export function compareTime(t1, t2) {
    const times = [-1, -1]
    if (typeof t1 === 'number') {
        times[0] = t1;
    } else if (typeof t1 === 'string') {
        times[0] = str2time(t1);
    }
    if (typeof t2 === 'number') {
        times[1] = t2;
    } else if (typeof t2 === 'string') {
        times[1] = str2time(t2);
    }
    if (times[0] === -1 || times[1] === -1) {
        // throw new Error("Given parameters either of t1 or t2 can't meet conditions!");
        times[0] = times[1] = 0;
    }
    return Math.sign(times[0] - times[1]);
}

export function time2hr(t, sep = ":") {
    // TODO
}