import { useState } from 'react';
import {
	CalendarIcon,
	ChevronDownIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	FlagIcon,
	AlertTriangleIcon,
	MinusIcon,
	PlusIcon,
	ClockIcon,
} from 'lucide-react';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { ScrollArea } from '@/ui/scroll-area';
import { Dialog, DialogTrigger, DialogContent } from '@/ui/dialog';
import { Progress } from '@/ui/progress';
import Task from '../atoms/entities/task';
import { Status } from '../atoms/value-objects/status';
import { Priority } from '../atoms/value-objects/priority';
import { Complexity } from '../atoms/value-objects/complexity';
import { Relevance } from '../atoms/value-objects/relevance';
import DateTimeInfo from '../atoms/value-objects/datetimeinfo';

interface TaskDisplayProps {
	task: Task;
	onTaskUpdate?: (task: Task) => void;
}

interface SelectFieldProps {
	label: string;
	icon?: React.ReactNode;
	value: string;
	options: Array<{ value: number; label: string }>;
	onChange: (value: string) => void;
}

const SelectField = ({ label, icon, value, options, onChange }: SelectFieldProps) => (
	<div className="flex items-center">
		<Label className="flex items-center gap-2 w-40">
			{icon}
			{label}
		</Label>
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value.toString()}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

interface CheckboxFieldProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const CheckboxField = ({ label, checked, onChange }: CheckboxFieldProps) => (
	<div className="flex items-center">
		<Label className="flex items-center gap-2 w-40">{label}</Label>
		<Input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-[180px]" />
	</div>
);

interface DateTimeFieldProps {
	label: string;
	value: Date | null;
	onChange: (date: Date | null) => void;
	readonly?: boolean;
}

const DateTimeField = ({ label, value, onChange, readonly }: DateTimeFieldProps) => (
	<div className="flex items-center">
		<Label className="flex items-center gap-2 w-40">
			<CalendarIcon className="w-4 h-4" />
			{label}
		</Label>
		{readonly ? (
			<div className="text-sm text-muted-foreground w-[180px]">{value?.toLocaleString()}</div>
		) : (
			<Input
				type="datetime-local"
				value={value?.toISOString().slice(0, 16) || ''}
				onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
				className="w-[180px]"
			/>
		)}
	</div>
);

interface RelatedTasksProps {
	tasks: Set<Task>;
	direction: 'upstreams' | 'downstreams';
	onRemove: (task: Task) => void;
	onAdd: () => void;
}

const RelatedTasks = ({ tasks, direction, onRemove, onAdd }: RelatedTasksProps) => (
	<div className="flex items-start">
		<Label className="flex items-center gap-2 w-40 mt-2">
			{direction === 'upstreams' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
			{direction === 'upstreams' ? 'Upstream' : 'Downstream'}
		</Label>
		<div className="flex flex-col">
			<ScrollArea className="h-24 w-[180px] rounded-md border">
				<div className="p-4">
					{Array.from(tasks).map((task) => (
						<div key={task.id} className="flex justify-between items-center text-sm mb-2">
							<span>{task.name}</span>
							<Button variant="ghost" size="sm" onClick={() => onRemove(task)}>
								<MinusIcon className="w-4 h-4" />
							</Button>
						</div>
					))}
				</div>
			</ScrollArea>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" size="sm" className="mt-2">
						<PlusIcon className="w-4 h-4 mr-2" />
						Add {direction === 'upstreams' ? 'Upstream' : 'Downstream'}
					</Button>
				</DialogTrigger>
				<DialogContent>{/* Dialog content implementation */}</DialogContent>
			</Dialog>
		</div>
	</div>
);

const statusOptions = Object.entries(Status)
	.filter(([key]) => !isNaN(Number(key)))
	.map(([key, value]) => ({ value: Number(key), label: Status[value] }));

const priorityOptions = Object.entries(Priority)
	.filter(([key]) => !isNaN(Number(key)))
	.map(([key, value]) => ({ value: Number(key), label: Priority[value] }));

const complexityOptions = Object.entries(Complexity)
	.filter(([key]) => !isNaN(Number(key)))
	.map(([key, value]) => ({ value: Number(key), label: Complexity[value] }));

export default function TaskDisplay({ task, onTaskUpdate }: TaskDisplayProps) {
	const [localTask, setLocalTask] = useState<Task>(task);

	const handleChange = (field: keyof Task, value: any) => {
		setLocalTask((prev) => {
			const newTask = new Task(
				prev.name,
				prev.status,
				prev.isFun,
				prev.isProductive,
				prev.complexity,
				prev.priority
			);
			Object.assign(newTask, prev, { [field]: value });
			onTaskUpdate?.(newTask);
			return newTask;
		});
	};

	const handleDateTimeInfoChange = (field: keyof DateTimeInfo, value: Date | null) => {
		setLocalTask((prev) => {
			const newTask = new Task(
				prev.name,
				prev.status,
				prev.isFun,
				prev.isProductive,
				prev.complexity,
				prev.priority
			);
			Object.assign(newTask, prev);
			newTask.dateTimeInfo[field] = value;
			onTaskUpdate?.(newTask);
			return newTask;
		});
	};

	return (
		<div className="p-4 bg-white shadow">
			<h1 className="text-2xl font-bold mb-4">{localTask.name}</h1>

			<div className="space-y-4">
				<SelectField
					label="Select Status"
					icon={<ChevronDownIcon className="w-4 h-4" />}
					value={localTask.status.toString()}
					options={statusOptions}
					onChange={(value) => handleChange('status', parseInt(value))}
				/>

				<SelectField
					label="Select Priority"
					icon={<ChevronDownIcon className="w-4 h-4" />}
					value={localTask.priority.toString()}
					options={priorityOptions}
					onChange={(value) => handleChange('priority', parseInt(value))}
				/>

				<RelatedTasks
					tasks={localTask.upstreams}
					direction="upstreams"
					onRemove={(item) =>
						handleChange('upstreams', new Set([...localTask.upstreams].filter((t) => t.id !== item.id)))
					}
					onAdd={() => {
						/* Implementation for adding upstream tasks */
					}}
				/>

				<RelatedTasks
					tasks={localTask.downstreams}
					direction="downstreams"
					onRemove={(item) =>
						handleChange('downstreams', new Set([...localTask.downstreams].filter((t) => t.id !== item.id)))
					}
					onAdd={() => {
						/* Implementation for adding downstream tasks */
					}}
				/>

				<SelectField
					label="Complexity"
					icon={<ChevronDownIcon className="w-4 h-4" />}
					value={localTask.complexity.toString()}
					options={complexityOptions}
					onChange={(value) => handleChange('complexity', parseInt(value))}
				/>

				<div className="flex items-center">
					<Label className="flex items-center gap-2 w-40">
						<FlagIcon className="w-4 h-4" />
						Relevance
					</Label>
					<div className="text-sm text-muted-foreground w-[180px]">{Relevance[localTask.relevance]}</div>
				</div>

				<CheckboxField
					label="Is Fun"
					checked={localTask.isFun}
					onChange={(checked) => handleChange('isFun', checked)}
				/>

				<CheckboxField
					label="Is Productive"
					checked={localTask.isProductive}
					onChange={(checked) => handleChange('isProductive', checked)}
				/>

				<div className="flex items-center">
					<Label className="flex items-center gap-2 w-40">Progress</Label>
					<Progress value={localTask.progress} className="w-[180px] border-l-green-600" />
				</div>

				<DateTimeField
					label="Creation Date"
					value={localTask.dateTimeInfo.creationDateTime}
					onChange={() => {}}
					readonly
				/>

				<DateTimeField
					label="Start Date"
					value={localTask.dateTimeInfo.startDateTime}
					onChange={(date) => handleDateTimeInfoChange('startDateTime', date)}
				/>

				<DateTimeField
					label="Finish Date"
					value={localTask.dateTimeInfo.finishDateTime}
					onChange={(date) => handleDateTimeInfoChange('finishDateTime', date)}
				/>

				<DateTimeField
					label="Limit Date"
					value={localTask.dateTimeInfo.limitDateTime}
					onChange={(date) => handleDateTimeInfoChange('limitDateTime', date)}
				/>

				<div className="flex items-center">
					<Label className="flex items-center gap-2 w-40">
						<ClockIcon className="w-4 h-4" />
						Time Spent
					</Label>
					<div className="text-sm text-muted-foreground w-[180px]">{localTask.dateTimeInfo.timeSpend}</div>
				</div>

				<div className="flex items-center">
					<Label className="flex items-center gap-2 w-40">
						<AlertTriangleIcon className="w-4 h-4" />
						Punctuality
					</Label>
					<div className="text-sm text-muted-foreground w-[180px]">{localTask.dateTimeInfo.punctuality}</div>
				</div>
			</div>
		</div>
	);
}
