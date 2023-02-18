export class Query {
  private state: Record<string, any> = {}

  get values() {
    if (!this.state.where) {
      return this.state
    }

    return {
      ...this.state,
      where: JSON.stringify(this.state.where)
    }
  }

  where(values: { [key: string]: any }) {
    this.state.where = { ...this.state.where, ...values }
    return this
  }

  include(values: string | string[]) {
    this.state.include = Array.isArray(values)
      ? values.join(',')
      : values
    return this
  }

  select(values: string[]) {
    this.state.keys = values.join(',')
    return this
  }

  order(values: string | string[]) {
    this.state.order = Array.isArray(values)
      ? values.join(',')
      : values
    return this
  }

  count(value?: 0 | 1) {
    this.state.count = value
    return this
  }

  limit(value: number) {
    this.state.limit = Math.max(0, value)
    return this
  }

  skip(value: number) {
    return this.offset(value)
  }

  offset(value: number) {
    this.state.skip = Math.max(0, value)
    return this
  }

  reset() {
    this.state = {}
    return this
  }
}
