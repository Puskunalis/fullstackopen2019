const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const createNotification = notification => ({
  type: 'SET_NOTIFICATION',
  notification
})

export default notificationReducer