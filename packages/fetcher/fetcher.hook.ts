/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { LoaderContext } from './loader/loader'
import { useToast } from './toast/toast'

export interface Error {
  message: string
  response: {
    status: number
    data: string
  }
}

type HTTP = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type FetchResult<T> = {
  get: (params: Object, disabledLoading?: boolean) => void
  post: (body: object) => void
  delete: (id: string) => void
  update: (body: object) => void
  data: T | undefined
  error: Error | undefined
  loading: boolean
}

interface FetchProps<T> {
  url: string
  body?: object
  callback?: (value: T) => void
  lazy?: boolean
  type?: HTTP
}

interface IParams {
  method: HTTP
  signal: AbortSignal
  headers: {
    Accept: string
  }
  body?: string
}

export function useFetch<T>({
  url,
  body,
  callback,
  lazy,
  type,
}: FetchProps<T>): FetchResult<T> {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [inProgress, setInProgress] = useState<boolean>(false),
    [loading, setLoading] = useContext(LoaderContext),
    [controller, setController] = useState<AbortController>(
      new AbortController()
    ),
    { error: toastError } = useToast()

  useEffect(() => {
    setController(new AbortController())
  }, [])

  async function handleFetch(method: HTTP, newBody?: any, reSync?: boolean) {
    if (inProgress) return
    setInProgress(true)
    if (!reSync) setLoading(true)

    const params: IParams = {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    }

    let link = url.match(/http/) ? url : `/api/${url}`

    if (method !== 'GET') {
      const query = new URLSearchParams(newBody as any)
      link += `?${query}`
    }

    if (method === 'DELETE' && newBody?.id) {
      link += `/${newBody.id}`
    }

    if (method.match(/PUT|POST/) && newBody) {
      params.body = JSON.stringify(newBody || body || {})
    }

    try {
      const res = await fetch(link, params)
      const resJson = await res.json()

      if (res.status !== 200) {
        setError(resJson)
        toastError(resJson.message)
      } else {
        setData(resJson)
        callback?.(resJson)
      }
    } catch (e: unknown) {
      const err = e as Error
      toastError(err.message)
      setError(err)
    }

    if (!reSync) setLoading(false)
    setInProgress(false)
  }

  useEffect(() => {
    if (!controller || lazy) return
    //timeout for prevent preload page
    setTimeout(() => {
      if (!data) handleFetch(type || 'GET', undefined)
    }, 100)

    return () => {
      if (inProgress) controller.abort('cleanup')
    }
  }, [controller])

  return {
    get: (params = {}, disabledLoading) =>
      handleFetch('GET', params, disabledLoading),
    post: (body) => handleFetch('POST', body),
    update: (body) => handleFetch('PUT', body),
    delete: (id) => handleFetch('DELETE', { id }),
    data,
    error,
    loading,
  }
}
