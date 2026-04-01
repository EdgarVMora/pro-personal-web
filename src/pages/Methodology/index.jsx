import { useEffect } from 'react'
import { journey } from '../../data/index'

function Metodologia() {
  useEffect(() => {
    console.log(journey)
  }, [])

  return null
}

export default Metodologia
