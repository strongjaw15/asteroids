// Will be used to format the date of createdAt

module.exports = {
  new_date: (newDate) => {
    return `${new Date(newDate).getMonth() + 1}/${new Date(
      newDate
    ).getDate()}/${new Date(newDate).getFullYear()}`;
  },
};
