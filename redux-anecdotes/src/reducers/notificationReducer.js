const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const createNotification = message => ({
  type: 'SET_NOTIFICATION',
  message
})

export default notificationReducer