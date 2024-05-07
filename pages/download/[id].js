import axios from "axios";

export default function DownloadPage({ audioLink }) {
  return (
    <div>
      <a href={audioLink}>{audioLink}</a>
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const id = params.id;
  const name = query.name;
  const options = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id: id },
    headers: {
      "X-RapidAPI-Key": "d300cc5d28mshd1ac37cace93828p1f8c19jsnf4ac6506e256",
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);

  const url = new URL(response.data.link);
  const nameParam = url.searchParams.get("n");

  function sanitizeFileName(fileName) {
    const invalidChars = /[\\/:"*?<>|'’‘]/g;
    return fileName.replace(invalidChars, " ");
  }

  if (nameParam) {
    url.searchParams.set("n", sanitizeFileName(name));
    const newUrl = url.toString();
    response.data.link = newUrl;
  }

  return {
    props: {
      audioLink: response.data.link,
    },
  };
}
