const s = {
  images: [".png", ".jpeg", ".jpg", ".svg"],
  audio: [".mp3"],
  video: [".mp4"],
  all: function() {
    return [...s.images, ...s.audio, ...s.video];
  }
};

module.exports = s;