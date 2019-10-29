import { isObject } from 'src/fns'

const API_URL = 'https://api.todoist.com/sync/v8'

const formData = (data) => {
  const objToForm = (formData, obj, parent) => {
    for (let key in obj) {
      const value = obj[key]
      const fullKey = [parent, key].filter(Boolean).join('.')
      if (Array.isArray(value)) formData.append(fullKey, JSON.stringify(value))
      else if (isObject(value)) formData.append(fullKey, objToForm(formData, value, fullKey))
      else formData.append(fullKey, value)
    }
    return formData
  }

  return objToForm(new FormData(), data)
}

export class TodoistClient {
  static ResourceType = {
    All: 'all',
    Projects: 'projects',
    Items: 'items'
  }

  #apiKey = ''

  constructor (apiKey) {
    this.#apiKey = apiKey
  }

  async getActivity (properties) {
    return fetch(`${API_URL}/activity/get`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData({
        token: this.#apiKey,
        ...properties
      })
    })
  }

  async getAll (...resourceTypes) {
    return fetch(`${API_URL}/sync`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData({
        token: this.#apiKey,
        sync_token: '*',
        resource_types: resourceTypes
      })
    })
  }
}
