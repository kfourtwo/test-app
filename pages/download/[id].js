import axios from "axios";

export default function DownloadPage({ data }) {
  return (
    <div>
      <a href={data.link}>Download</a>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const handleClick = async (id) => {
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

    if (response.data.status === "processing") {
      const videoId = id;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await handleClick(videoId);
    } else {
      return response;
    }
  };

  const response = await handleClick(params.id);

  return {
    props: {
      data: response.data,
    },
  };
}
