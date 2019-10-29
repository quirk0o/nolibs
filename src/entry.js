import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { TodoistClient } from 'src/api/client'
import { ActivityChart } from 'src/app/activity/activity-chart.component'
import { concat, filter, map, notNil, prop, reduce } from 'src/fns'
import { BrowserHistory } from 'src/history'
import { Router } from 'src/router/router'

const render = () => {
  const history = new BrowserHistory()
  const router = new Router()
  router.route('/todos/:id', ({ params: { id } }) => {
    const ToDo = React.lazy(() => import(/* webpackChunkName: "todo" */'./todo'))
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ToDo id={id} />
      </Suspense>
    )
  })

  const client = new TodoistClient(TODOIST_ACCESS_TOKEN)
  client.getAll(TodoistClient.ResourceType.Projects)
    .then((response) => response.json())
    .then((json) => console.log(json))

  Promise.all([
    client.getActivity({ event_type: 'completed', limit: 100 }),
    client.getActivity({ event_type: 'completed', limit: 100, page: 2 }),
    client.getActivity({ event_type: 'completed', limit: 100, page: 3 })
  ])
    .then((responses) => Promise.all(responses.map(response => response.json())))
    .then(filter(notNil))
    .then(map(prop('events')))
    .then(reduce(concat, []))
    .then((events) => ReactDOM.render(<ActivityChart events={events} />, document.getElementById('root')))

  // const element = router.resolve(history.location())
  //   .option(<ActivityChart events={} />)
  //
  // ReactDOM.render(element, document.getElementById('root'))
}

render()
