export default (uid, name, user, timestamp, history=[]) => ({
  id: uid,
  name: name,
  user: user,
  history: history,
  timestamp: timestamp
})