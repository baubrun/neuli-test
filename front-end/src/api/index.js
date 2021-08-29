import $ from "jquery";

export const url = "https://reqres.in/api/users";

/**
 * GET users
 * @param {string} v1
 * @param {string} v2
 * @returns Promise
 */
export const fetchUsers = async (v1, v2) => {
  const result = await Promise.all([
    await $.get(`${url}/${v1}`),
    await $.get(`${url}/${v2}`),
  ]);
  return result;
};
