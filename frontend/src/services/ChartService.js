import axios from 'axios'

export default class {
  static getSolarChart() {
    return new Promise((resolve, reject) => {
      axios
        .post('charts/solar')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  }

  static getBatteryChart() {
    return new Promise((resolve, reject) => {
      axios
        .post('charts/battery')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  }

  static getLoadChart() {
    return new Promise((resolve, reject) => {
      axios
        .post('charts/load')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response.data)
        })
    })
  }
}
