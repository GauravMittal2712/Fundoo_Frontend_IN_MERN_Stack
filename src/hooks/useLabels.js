import { useCallback, useEffect, useState } from 'react'
import * as labelService from '../services/labelService'

export default function useLabels() {
  const [labels, setLabels] = useState([])

  const reload = useCallback(async () => {
    try {
      setLabels(await labelService.getLabels())
    } catch {
      /* non-fatal */
    }
  }, [])

  useEffect(() => {
    let ignore = false
    labelService
      .getLabels()
      .then((data) => !ignore && setLabels(data))
      .catch(() => {
        /* non-fatal */
      })
    return () => {
      ignore = true
    }
  }, [])

  // These throw on failure so the caller (the labels modal) can show the message.
  const create = async (name) => {
    await labelService.createLabel(name)
    await reload()
  }
  const rename = async (id, name) => {
    await labelService.updateLabel(id, name)
    await reload()
  }
  const remove = async (id) => {
    await labelService.deleteLabel(id)
    await reload()
  }

  return { labels, create, rename, remove, reload }
}
