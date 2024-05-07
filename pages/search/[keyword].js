import axios from "axios";

export default function SearchPage({ videos }) {
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
            <a href={`/download/${video.id}?name=${video.title}`}>
              Download Audio
            </a>
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
