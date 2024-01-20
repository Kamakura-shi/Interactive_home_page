const CONV_INIT = new Intl.NumberFormat
(undefined, {minimumIntegerDigits: 2,

})

export function convert(minutes: number) {
    const hrs = Math.floor(minutes / 60 / 60)
    const min = Math.floor((minutes - hrs * 60 * 60) / 60)
    const sec = minutes % 60

    if (hrs > 0) {
        return `${hrs}:${CONV_INIT.format(min
        )}:${CONV_INIT.format(sec)}`
    }
    
    return `${min}:${CONV_INIT.format(sec)}`
}