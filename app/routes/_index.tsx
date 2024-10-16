import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
	const defaultLayout = [20, 32, 48];
	const navCollapsedSize = 4;
	const defaultCollapsed = false;
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const navBarLinks = [
		{
			title: 'Task Dashboard',
			label: '0',
			icon: ListTodo,
			variant: 'outline',
			to: '/inbox',
		},
		{
			title: 'Planning Dashboard',
			label: '0',
			icon: ClipboardList,
			variant: 'outline',
			to: '/planning',
		},
	];

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 ">
			<TooltipProvider delayDuration={0}>
				<ResizablePanelGroup
					direction="horizontal"
					onLayout={(sizes: number[]) => {
						document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
					}}
					className="h-full items-stretch"
				>
					<ResizablePanel
						defaultSize={defaultLayout[0]}
						collapsedSize={navCollapsedSize}
						collapsible={true}
						minSize={15}
						maxSize={20}
						onCollapse={() => {
							setIsCollapsed(true);
							document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
						}}
						onResize={() => {
							setIsCollapsed(false);
							document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
						}}
						className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
					>
						<Nav isCollapsed={isCollapsed} links={navBarLinks} />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
						<Outlet />
					</ResizablePanel>
					<ResizableHandle withHandle />
					{<ResizablePanel defaultSize={35} minSize={30}></ResizablePanel>}
				</ResizablePanelGroup>
			</TooltipProvider>
		</div>
	);
}
