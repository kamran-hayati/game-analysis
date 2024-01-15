/**
 * potentially, it can contain any state including `SUSPEND`, `SUSPEND_READY`, `READY`, etc. Just keep it simple
 * for processing the form during interview, i.e., let it be!
 * @type {{TERMINATE: (number|string)[], RUN: (number|string)[], WAIT: (number|string)[]}}
 */
export const SessionStatusEnum = {
    WAIT: [0, 'wait'],
    READY: [1, 'ready'],
    RUN: [2, 'running'],
    TERMINATE: [3, 'terminate']
}

/**
 * it sorts `SessionStatusEnum` based on index prepared on value as the first element.
 * @type {string[]}
 */
export const SessionStatusList = Object.keys(SessionStatusEnum)
    .map(key => SessionStatusEnum[key])
    .sort((stat1, stat2) => stat1[0] - stat2[0])
//.map(stat => stat[1]);

/**
 * returns a triplet including previous, current, and the next session.
 * if current session is `terminate` it doesn't need to be terminated unless backend server accepts the request.
 * in such cases server doesn't proceed it might be suspended or waited to the next try!
 * @param stat {[string]}
 * @returns {[string,string,string]|string[]}
 * @constructor
 */
export const SessionStatuses = (stat = SessionStatusEnum.WAIT) => {
    const index = SessionStatusList.findIndex(s => s[1] === stat[1]);
    const L = SessionStatusList.length;
    if (index <= 0) return [undefined, SessionStatusList[0], SessionStatusList[1]];
    else if (index >= L - 1) return [SessionStatusList[L - 2], SessionStatusList[L - 1], undefined];
    return [SessionStatusList[index - 1], SessionStatusList[index],
        SessionStatusList[(index + 1) % SessionStatusList.length]];
}

/**
 * helpful for proceeding the interview polarizing and scoring games and keep the session on otherwise terminate it.
 * @param currentStatus {[string]}
 * @returns {[string]}
 * @constructor
 */
export const NextSessionStatus = (currentStatus) => {
    const stats = SessionStatuses(currentStatus);
    return stats[2];
}

/**
 * for some specific reason you may need the previous session, however, in most cases next session is needed.
 * @param currentStatus {[string]}
 * @returns {*}
 * @constructor
 */
export const PreviousSessionStatus = (currentStatus) => {
    const stats = SessionStatuses(currentStatus);
    return stats[0];
}

/*
let current = SessionStatusEnum.WAIT;
console.log({SessionStatusEnum, SessionStatusList, SessionStatuses: SessionStatuses(current)})
current = SessionStatusEnum.WAIT;
console.log({current, next: NextSessionStatus(current)})
current = SessionStatusEnum.READY;
console.log({current, next: NextSessionStatus(current)})
current = SessionStatusEnum.RUN;
console.log({current, next: NextSessionStatus(current)})
current = SessionStatusEnum.TERMINATE;
console.log({current, next: NextSessionStatus(current)})

current = SessionStatusEnum.TERMINATE;
console.log({current, prev: PreviousSessionStatus(current)})
current = SessionStatusEnum.RUN;
console.log({current, prev: PreviousSessionStatus(current)})
current = SessionStatusEnum.READY;
console.log({current, prev: PreviousSessionStatus(current)})
current = SessionStatusEnum.WAIT;
console.log({current, prev: PreviousSessionStatus(current)})
current = undefined;
console.log({prev: PreviousSessionStatus(current), current, next: NextSessionStatus(current),
    SessionStatuses: SessionStatuses(current), SessionStatusList})
    */

/*
{
  SessionStatusEnum: {
    WAIT: [ 0, 'wait' ],
    READY: [ 1, 'ready' ],
    RUN: [ 2, 'running' ],
    TERMINATE: [ 3, 'terminate' ]
  },
  SessionStatusList: [
    [ 0, 'wait' ],
    [ 1, 'ready' ],
    [ 2, 'running' ],
    [ 3, 'terminate' ]
  ],
  SessionStatuses: [ undefined, [ 0, 'wait' ], [ 1, 'ready' ] ]
}
{ current: [ 0, 'wait' ], next: [ 1, 'ready' ] }
{ current: [ 1, 'ready' ], next: [ 2, 'running' ] }
{ current: [ 2, 'running' ], next: [ 3, 'terminate' ] }
{ current: [ 3, 'terminate' ], next: undefined }
{ current: [ 3, 'terminate' ], prev: [ 2, 'running' ] }
{ current: [ 2, 'running' ], prev: [ 1, 'ready' ] }
{ current: [ 1, 'ready' ], prev: [ 0, 'wait' ] }
{ current: [ 0, 'wait' ], prev: undefined }
{
  prev: undefined,
  current: undefined,
  next: [ 1, 'ready' ],
  SessionStatuses: [ undefined, [ 0, 'wait' ], [ 1, 'ready' ] ],
  SessionStatusList: [
    [ 0, 'wait' ],
    [ 1, 'ready' ],
    [ 2, 'running' ],
    [ 3, 'terminate' ]
  ]
}
 */
