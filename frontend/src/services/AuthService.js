import axios from 'axios'

export default class {
  static login(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('login', data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  }

  static register(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('register', data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  }
}
