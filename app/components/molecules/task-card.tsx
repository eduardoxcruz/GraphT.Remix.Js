import { ComponentProps } from 'react';

import { cn } from '~/lib/utils';
import { Badge } from '@/ui/badge';
import Task from '@/atoms/entities/task';
import { Status } from '../atoms/value-objects/status';
import { Priority } from '../atoms/value-objects/priority';
import { Relevance } from '../atoms/value-objects/relevance';

interface TaskCardProps {
	task: Task;
	isSelected: boolean;
	onClick: () => void;
}

export default function TaskCard({ task, isSelected, onClick }: TaskCardProps) {
	return (
		<button
			className={cn(
				'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-white w-full',
				isSelected && 'bg-muted'
			)}
			onClick={onClick}
		>
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center">
					<div className="flex items-center gap-2">
						<div className="font-semibold">{task.name}</div>
						{task.status === Status.InProgress && (
							<span className="flex h-2 w-2 rounded-full bg-blue-600" />
						)}
					</div>
					<div className={cn('ml-auto text-xs', isSelected ? 'text-foreground' : 'text-muted-foreground')}>
						20. Octubre, 2024 15:03:04 AM
					</div>
				</div>
				<div className="text-xs font-medium">Status: {task.status}</div>
			</div>
			<div className="line-clamp-2 text-xs text-muted-foreground">
				Complexity: {task.complexity}
			</div>
			<div className="flex items-center gap-2">
				<Badge variant={getBadgeVariantFromPriority(task.priority)}>Priority: {task.priority}</Badge>
				<Badge variant={getBadgeVariantFromRelevance(task.relevance)}>Relevance: {task.relevance}</Badge>
			</div>
		</button>
	);
}

function getBadgeVariantFromPriority(priority: Priority): ComponentProps<typeof Badge>['variant'] {
	switch (priority) {
		case Priority.DoItNow:
			return 'destructive';
		case Priority.DropEverythingElse:
			return 'default';
		case Priority.ThinkAboutIt:
			return 'secondary';
		default:
			return 'outline';
	}
}

function getBadgeVariantFromRelevance(relevance: Relevance): ComponentProps<typeof Badge>['variant'] {
	switch (relevance) {
		case Relevance.Entertaining:
			return 'default';
		case Relevance.Necessary:
			return 'secondary';
		case Relevance.Purposeful:
			return 'destructive';
		case Relevance.Superfluous:
			return 'outline';
		default:
			return 'outline';
	}
}
