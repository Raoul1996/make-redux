function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return {getState, dispatch, subscribe}
}

function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  renderTitle(newAppState.title)
  renderContent(newAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color

}

const appState = {
  title: {
    text: 'React little book',
    color: 'red'
  },
  content: {
    text: 'the content of react little book',
    color: 'blue'
  }
}


function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}


const store = createStore(appState, stateChanger)
let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

renderApp(store.getState())

store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'Raoul\'s lover already leave'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'gray'})