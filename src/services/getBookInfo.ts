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

export const getGoogleBookInfo = async ({
  title,
  author,
}: {
  title: string;
  author: string;
}) => {
  const query = `${title}+inauthor:${author}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&key=${"API_KEY_GOES_HERE"}`;
  const response = await fetch(url);
  return response;
};
