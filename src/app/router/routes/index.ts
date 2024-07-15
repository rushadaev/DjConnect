import financeRouter from './finance.router'
import mainRoutes from './main.routes'
import ordersRouter from './orders.router'
import storyRouter from './story.router'
import supportRouter from './support.router'

export default [
	...mainRoutes,
	...financeRouter,
	...ordersRouter,
	...storyRouter,
	...supportRouter,
]
