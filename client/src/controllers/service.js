import axios from "axios";

export const getServiceByCategory = (categoryName) => {
  axios
    .get("http://localhost:9000/api/service")
    .then(function (response) {
      const filteredServices = response.filter(
        (serrvice) => service.categoryName === categoryName
      );
      return filteredServices.length ? filteredServices[0] : {};
    })
    .catch(function (error) {
      console.log(error);
    });
};
