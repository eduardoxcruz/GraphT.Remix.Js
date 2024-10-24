class DateTimeInfo {
    public creationDateTime: Date;
    public startDateTime: Date | null;
    public finishDateTime: Date | null;
    public limitDateTime: Date | null;
    private _timeSpend: string;

    constructor() {
        this.creationDateTime = new Date();
        this.startDateTime = null;
        this.finishDateTime = null;
        this.limitDateTime = null;
        this._timeSpend = '\u23f0 0 day(s) - 0 hours - 0 minutes';
    }

    public set timeSpend(timeSpend: number) {
        if (timeSpend < 1) {
            this._timeSpend = '\u23f0 0 day(s) - 0 hours - 0 minutes';
            return;
        }

        const days = Math.floor(timeSpend / (24 * 60 * 60 * 1000));
        const hours = Math.floor((timeSpend % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((timeSpend % (60 * 60 * 1000)) / (60 * 1000));

        const emoji = timeSpend > 60 * 60 * 1000 ? '\u23f0' : '\u26a1';
        this._timeSpend = `${emoji} ${days} day(s) - ${hours} hours - ${minutes} minutes`;
    }

	public get timeSpend(): string {
		return this._timeSpend;
	}

	public set punctuality(value: string) {
		return;
	}

    public get punctuality(): string {
        const now = new Date();

        if (!this.limitDateTime) return '\u26a0 No Target';

        if (this.finishDateTime) {
            if (this.finishDateTime.toDateString() === this.limitDateTime.toDateString()) return '\u2705 On Time!';

            const daysDifference = Math.abs(this.getDaysDifference(this.limitDateTime, this.finishDateTime));

            return this.finishDateTime > this.limitDateTime
                ? `\ud83d\udea8 Late ${daysDifference} day(s)!`
                : `\u2b50 Early ${daysDifference} day(s)!`;
        }

        if (now.toDateString() === this.limitDateTime.toDateString()) return '\u26a0 Finish Today!';

        if (now > this.limitDateTime) {
            const daysLate = Math.abs(this.getDaysDifference(this.limitDateTime, now));
            return `\ud83d\udea8 Late ${daysLate} day(s)!`;
        }

        const daysToGo = this.getDaysDifference(now, this.limitDateTime) + 1;
        return `\u23f1 ${daysToGo} day(s) to go!`;
    }

    private getDaysDifference(date1: Date, date2: Date): number {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

export default DateTimeInfo;
