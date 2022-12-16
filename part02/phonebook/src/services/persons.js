import axios from "axios";

const BASE_URL = '/api/persons';

const getAll = () => {
  return axios
    .get(BASE_URL)
    .then((res) => res.data);
}

const create = (person) => {
  return axios
    .post(BASE_URL, person)
    .then((res) => res.data);
}

const remove = (id) => {
  return axios
    .delete(`${BASE_URL}/${id}`)
    .then((res) => res.data);
}

const update = (newPerson) => {
  return axios
    .put(`${BASE_URL}/${newPerson.id}`, newPerson)
    .then((res) => res.data);
}

export default { create, getAll, update, remove };
