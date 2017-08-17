import axios from 'axios';
import qs from 'qs'
// let base = 'http://www.ehometd.com/api';
let base = '/e-api'

//  Login
export const login = params => {
  return axios.post(`${base}/user/login.php`, qs.stringify(params))
  .then(res => res.data)
}


export const getInfo = params => {
  return axios.get(`${base}/user/getInfo.php`, { params })
}
