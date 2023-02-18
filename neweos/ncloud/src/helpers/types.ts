export function isoDate(date: Date) {
  return { __type: 'Date', iso: date.toISOString() }
}

export function latlng(latitude: number, longitude: number) {
  return { __type: 'GeoPoint', latitude, longitude }
}

export function pointer(className: string, objectId: string) {
  return { __type: 'Pointer', className, objectId }
}

function increment(value: number = 1) {
  return { __op: 'Increment', amount: value }
}

function decrement(value: number = 1) {
  return { __op: 'Decrement', amount: value }
}

function addRelation(className: string, objectId: string) {
  return {
    __op: 'AddRelation',
    objects: [
      { __type: 'Pointer', className, objectId }
    ]
  }
}

function removeRelation(className: string, objectId: string) {
  return {
    __op: 'RemoveRelation',
    objects: [
      { __type: 'Pointer', className, objectId }
    ]
  }
}

function deleteProperty() {
  return { __op: 'Delete' }
}

export const op = {
  increment,
  decrement,
  addRelation,
  removeRelation,
  deleteProperty
}
