const SCHOOL_VIDEO =
  "/img/UNI%20-%20Photos/Christmas%20photots_/video.mp4";

export default function AcademyOdysseySection() {
  return (
    <section className="fullscreen-video-section" aria-label="School video">
      <video
        className="fullscreen-video"
        src={SCHOOL_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
      />
    </section>
  );
}
