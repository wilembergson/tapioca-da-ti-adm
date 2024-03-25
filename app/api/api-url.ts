const LOCALHOST='http://localhost:8080'
const PRODUCAO='https://tapioca-da-ti-backend.onrender.com/tapiocadati'

const state = true

const API_URL = state ? PRODUCAO : LOCALHOST

export default API_URL