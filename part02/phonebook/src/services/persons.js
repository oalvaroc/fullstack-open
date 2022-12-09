import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const getAll = () => {
  return axios
    .get(`${BASE_URL}/persons`)
    .then((res) => res.data);
}

const create = (person) => {
  return axios
    .post(`${BASE_URL}/persons`, person)
    .then((res) => res.data);
}

const remove = (id) => {
  return axios
    .delete(`${BASE_URL}/persons/${id}`)
    .then((res) => res.data);
}

const update = (newPerson) => {
  return axios
    .put(`${BASE_URL}/persons/${newPerson.id}`, newPerson)
    .then((res) => res.data);
}

export default { create, getAll, update, remove };
