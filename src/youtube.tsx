import React from 'react';

interface Props {
  videoUrl: string;
}

const YouTubeVideo: React.FC<Props> = ({ videoUrl }) => {
  const getVideoIdFromUrl = (url: string): string | null => {
    const matches = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/) || "";
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null; // 有効なリンクではない場合、nullを返す
  };

  const videoId = getVideoIdFromUrl(videoUrl);

  if (videoId) {
    const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameBorder="0" allowFullScreen></iframe>`;
    return (
      <div>
        <h2>YouTube動画</h2>
        <div dangerouslySetInnerHTML={{ __html: embedCode }} />
      </div>
    );
  } else {
    return <div>This link is invalid.</div>;
  }
};

export default YouTubeVideo;


