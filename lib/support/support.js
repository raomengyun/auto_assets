const s = {
  images: [".png", ".jpeg", ".jpg"],
  svgs: [".svg"],
  audio: [".mp3"],
  video: [".mp4"],
  all: function() {
    return [...s.images, ...s.svgs, ...s.audio, ...s.video];
  }
};

module.exports = s;
