import Axios from 'axios'
const ip = 'http://127.0.0.1:3001/'

function axios_get(url, data, callback) {
  Axios.get(ip + url, {
    params: data
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err, 'err')
  })
}

function axios_post(url, data, callback) {
  Axios.post(ip + url, {
    params: data
  }).then((result) => {
    callback(result)
  }).catch((err) => {
    console.log(err, 'err')
  })
}
export {
  axios_get,axios_post
}
