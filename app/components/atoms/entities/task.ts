import { v4 as uuidv4 } from 'uuid';
import { Status } from '../value-objects/status';
import { Relevance } from '../value-objects/relevance';
import { Complexity } from '../value-objects/complexity';
import { Priority } from '../value-objects/priority';
import DateTimeInfo from '../value-objects/datetimeinfo';

class Task {
	public readonly id: string;
	public name: string;
	public status: Status;
	private _isFun: boolean;
	private _isProductive: boolean;
	private _relevance: Relevance;
	private _dateTimeInfo: DateTimeInfo;
	private _upstreams: Set<Task>;
	private _downstreams: Set<Task>;
	public complexity: Complexity;
	public priority: Priority;

	constructor(
		name: string,
		status: Status = Status.Backlog,
		isFun: boolean = false,
		isProductive: boolean = false,
		complexity: Complexity = Complexity.Indefinite,
		priority: Priority = Priority.MentalClutter
	) {
		this.id = uuidv4();
		this.name = name;
		this.status = status;
		this._isFun = isFun;
		this._isProductive = isProductive;
		this._dateTimeInfo = new DateTimeInfo();
		this._upstreams = new Set();
		this._downstreams = new Set();
		this.complexity = complexity;
		this.priority = priority;
		this.updateRelevance();
	}

	get isFun(): boolean {
		return this._isFun;
	}

	set isFun(value: boolean) {
		this._isFun = value;
		this.updateRelevance();
	}

	get isProductive(): boolean {
		return this._isProductive;
	}

	set isProductive(value: boolean) {
		this._isProductive = value;
		this.updateRelevance();
	}

	get progress(): number {
		return this.getProgress();
	}

	get relevance(): Relevance {
		return this._relevance;
	}

	get dateTimeInfo(): DateTimeInfo {
		return this._dateTimeInfo;
	}

	get upstreams(): ReadonlySet<Task> {
		return this._upstreams;
	}

	get downstreams(): ReadonlySet<Task> {
		return this._downstreams;
	}

	private updateRelevance(): void {
		if (this._isFun && this._isProductive) {
			this._relevance = Relevance.Purposeful;
		} else if (!this._isFun && this._isProductive) {
			this._relevance = Relevance.Necessary;
		} else if (this._isFun && !this._isProductive) {
			this._relevance = Relevance.Entertaining;
		} else {
			this._relevance = Relevance.Superfluous;
		}
	}

	private getProgress(): number {
		const totalDownstreams = this._downstreams.size;
		const backlogTasks = [...this._downstreams].filter((task) => task.status === Status.Backlog).length;
		const completedOrDroppedTasks = [...this._downstreams].filter(
			(task) => task.status === Status.Completed || task.status === Status.Dropped
		).length;
		const currentTask = 1;
		const isFinished = 100;
		const isUnfinished = 0;

		if (totalDownstreams === 0) {
			return this.status === Status.Completed ? isFinished : isUnfinished;
		}

		if (completedOrDroppedTasks >= totalDownstreams) return isFinished;
		if (backlogTasks === totalDownstreams) return isUnfinished;

		return (completedOrDroppedTasks * isFinished) / (totalDownstreams + currentTask);
	}
}

export default Task;
