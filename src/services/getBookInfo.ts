import axios from "axios";

export const getBookInfo = async ({
  title,
  author,
}: {
  title: string;
  author: string;
}) => {
  const response = await axios.get("https://openlibrary.org/search.json", {
    params: {
      title,
      author,
    },
  });

  return response.data.docs;
};
