import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
	return <div className="flex min-h-screen w-full flex-col bg-muted/40 "></div>;
}
