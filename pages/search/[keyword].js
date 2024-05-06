import axios from "axios";

// window.open("https://sss.com", "_blank");

export default function SearchPage({ videos }) {
  //   const handleDownload = async (id) => {
  //     const options = {
  //       method: "GET",
  //       url: "https://youtube-mp36.p.rapidapi.com/dl",
  //       params: { id: id },
  //       headers: {
  //         "X-RapidAPI-Key": "d300cc5d28mshd1ac37cace93828p1f8c19jsnf4ac6506e256",
  //         "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
  //       },
  //     };
  //     try {
  //       const videoId = id;
  //       const response = await axios.request(options);
  //       if (response.data.status === "processing") {
  //         console.log("ĐANG XỬ LÍ");
  //         await new Promise((resolve) => setTimeout(resolve, 2000));
  //         await handleDownload(videoId);
  //       } else {
  //         window.open("http://facebook.com", "_blank");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <div className="video" key={video.id}>
            <h3 className="video-title">{video.title}</h3>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
            />
            <a href={`/download/${video.id}`}>Download Audio</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { keyword } = params;
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?q=${keyword}&key=AIzaSyCZKGXDBZ-1Z3FzdqeOun2TFSENRkm7fSo&part=snippet&type=videohttps://www.googleapis.com/youtube/v3/search?q=${keyword}&key=AIzaSyCZKGXDBZ-1Z3FzdqeOun2TFSENRkm7fSo&part=snippet&type=video&maxResults=10`
  );
  const videos = response.data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url,
  }));
  return {
    props: {
      videos,
    },
  };
}
