function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    // 由于stateChanger返回的是一个新的对象，所以要将state替换
    state = stateChanger(state, action)
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return {getState, dispatch, subscribe}
}

function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
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

// 每次都要返回一个新的对象
function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state, title: {...state.title, text: action.text}
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state, title: {...state.title, color: action.color}
      }
    default:
      return state
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