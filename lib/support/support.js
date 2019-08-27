module.exports = {
  images: [".png", ".jpeg", ".jpg", ".svg"],
  audio: ["mp3"],
  video: ["mp4"],
  all: [...this.images, ...this.audio, ...this.video]
};
