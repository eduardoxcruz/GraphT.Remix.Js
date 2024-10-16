import type { MetaFunction } from '@remix-run/node';
import { Search } from 'lucide-react';
import Task from '~/components/atoms/entities/task';
import { Input } from '~/components/atoms/shadcn-ui/input';
import { Separator } from '~/components/atoms/shadcn-ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/atoms/shadcn-ui/tabs';
import { Complexity } from '~/components/atoms/value-objects/complexity';
import { Priority } from '~/components/atoms/value-objects/priority';
import { Status } from '~/components/atoms/value-objects/status';
import { TaskList } from '~/components/organisms/task-list';

export const meta: MetaFunction = () => {
    return [{ title: 'Task Inbox' }, { name: 'description', content: '' }];
};

export default function TaskInbox() {
    const tasks: Task[] = [
        new Task('Setup project', Status.Backlog, false, true, Complexity.Low, Priority.DoItNow),
        new Task('Design UI', Status.InProgress, true, false, Complexity.High, Priority.DoItNow),
        new Task('Write unit tests', Status.Backlog, false, true, Complexity.Indefinite, Priority.DropEverythingElse),
        new Task('Refactor code', Status.InProgress, false, true, Complexity.High, Priority.MentalClutter),
        new Task('Deploy to staging', Status.Dropped, false, true, Complexity.Low, Priority.ThinkAboutIt),
        new Task(
            'Research new framework',
            Status.Dropped,
            true,
            false,
            Complexity.Indefinite,
            Priority.DropEverythingElse
        ),
        new Task('Update documentation', Status.Backlog, false, true, Complexity.Low, Priority.DoItNow),
        new Task('Fix critical bug', Status.InProgress, false, true, Complexity.High, Priority.MentalClutter),
        new Task('Brainstorm new features', Status.Created, true, true, Complexity.Low, Priority.ThinkAboutIt),
        new Task(
            'Customer feedback analysis',
            Status.ReadyToStart,
            false,
            true,
            Complexity.Indefinite,
            Priority.ThinkAboutIt
        ),
    ];

    return (
        <Tabs defaultValue="readytogo">
            <div className="flex items-center px-4 py-2">
                <h1 className="text-xl font-bold">Inbox</h1>
                <TabsList className="ml-auto">
                    <TabsTrigger value="readytogo" className="text-zinc-600 dark:text-zinc-200">
                        Ready to Go!
                    </TabsTrigger>
                    <TabsTrigger value="doing" className="text-zinc-600 dark:text-zinc-200">
                        Doing!
                    </TabsTrigger>
                    <TabsTrigger value="finished" className="text-zinc-600 dark:text-zinc-200">
                        Finished!
                    </TabsTrigger>
                </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search" className="pl-8" />
                    </div>
                </form>
            </div>
            <TabsContent value="readytogo" className="m-0">
                <TaskList tasks={tasks} />
            </TabsContent>
            <TabsContent value="doing" className="m-0"></TabsContent>
            <TabsContent value="doing" className="m-0"></TabsContent>
        </Tabs>
    );
}
