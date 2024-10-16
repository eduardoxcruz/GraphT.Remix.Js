import { useState } from 'react';

import { ScrollArea } from '@/ui/scroll-area';
import Task from '@/atoms/entities/task';
import TaskCard from '../molecules/task-card';

interface TaskListProps {
    tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                    />
                ))}
            </div>
        </ScrollArea>
    );
}
