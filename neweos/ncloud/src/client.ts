import type { AxiosInstance } from 'axios'
import { build } from './helpers/axios'
import { Query } from './query'

export type ClientOpts = {
  appId: string
  appKey: string
  masterKey: string
}

export class Client {
  private readonly axios: AxiosInstance
  private readonly query: Query
  private className: string
  private objectId?: string

  constructor({ appId, appKey, masterKey }: ClientOpts) {
    this.axios = build(appId, appKey, masterKey)
    this.query = new Query()
  }

  get classesPath() {
    return !this.objectId
      ? `/classes/${this.className}`
      : `/classes/${this.className}/${this.objectId}`
  }

  dataset(identifier: string) {
    const [className, objectId] = identifier.split('/')

    if (className) { this.className = className }
    if (objectId) { this.objectId = objectId }

    this.query.reset()
    return this
  }

  create(data: any = {}) {
    return this.axios.post(this.classesPath, data)
  }

  update(data: any = {}) {
    return this.axios.put(this.classesPath, data, { params: this.query.values })
  }

  delete() {
    return this.axios.delete(this.classesPath, { params: this.query.values })
  }

  get() {
    return this.axios.get(this.classesPath, { params: this.query.values })
  }

  ids() {
    return this.select(['objectId']).get()
  }

  pluck(key: string) {
    return this.select([key]).get()
  }

  first(value: number = 1) {
    return this.order('createdAt').limit(value).get()
  }

  last(value: number = 1) {
    return this.order('-createdAt').limit(value).get()
  }

  where(values: { [key: string]: any }) { this.query.where(values)  ; return this }
  include(values: string | string[])    { this.query.include(values); return this }
  select(values: string[])              { this.query.select(values) ; return this }
  order(values: string | string[])      { this.query.order(values)  ; return this }

  count() {
    this.query.limit(0).count(1)
    return this.get()
  }

  limit(value: number)  { this.query.limit(value) ; return this }
  skip(value: number)   { this.query.skip(value)  ; return this }
  offset(value: number) { this.query.offset(value); return this }

  classes(className: string, objectId: string) {
    return objectId
      ? this.axios.get(`/classes/${className}/${objectId}`)
      : this.axios.get(`/classes/${className}`)
  }

  schemas(className?: string) {
    return className
      ? this.axios.get(`/schemas/${className}`)
      : this.axios.get('/schemas')
  }

  date() {
    return this.axios.get('/date')
  }

  debug() {
    this.axios.interceptors.request.use((request) => {
      const { method, url, params, data } = request
      console.log({ method, url, params, data })
      return request
    })
  }
}
