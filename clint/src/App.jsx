import { useState } from 'react'
import PlayWithFriends from './Play'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<PlayWithFriends/>
    </>
  )
}

export default App
