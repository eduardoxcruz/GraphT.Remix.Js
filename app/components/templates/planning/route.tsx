import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Task Planning' }, { name: 'description', content: '' }];
};

export default function TaskPlanning() {
    return <div></div>;
}
