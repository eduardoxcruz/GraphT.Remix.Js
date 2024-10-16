import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Task Inbox' }, { name: 'description', content: '' }];
};

export default function TaskInbox() {
    return <div></div>;
}
