import React, { useEffect, useMemo, useState , useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Camera,
  Check,
  ChevronDown,
  Gift,
  Heart,
  Mail,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { story } from "./data";
import "./style.css";

function App() {
  const [giftOpen, setGiftOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [wishIndex, setWishIndex] = useState(0);
  const [days, setDays] = useState(null);
  const audioRef = useRef(null);
  

  useEffect(() => {
    if (!story.birthdayISO) return;
    const target = new Date(story.birthdayISO).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setDays({ passed: true });
        return;
      }
      setDays({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!musicOn) return;
    const audio = document.getElementById("theme-song");
    if (audio) audio.play().catch(() => setMusicOn(false));
  }, [musicOn]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const changeWish = (direction) =>
    setWishIndex(
      (i) => (i + direction + story.wishes.length) % story.wishes.length,
    );

  return (
    <>
    
      <audio ref={audioRef} id="theme-song" src={story.songFile} loop preload="none" />
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#home">
          <span className="tiny-heart">♥</span> little archive
        </a>
        <nav>
          <a href="#memories">our story</a>
          <a href="#gallery">the album</a>
          <a href="#letter">a letter</a>
        </nav>
<button
  className={`music-toggle ${musicOn ? "playing" : ""}`}
  onClick={() => {
    if (musicOn) {
      audioRef.current?.pause();
      setMusicOn(false);
    } else {
      audioRef.current?.play();
      setMusicOn(true);
    }
  }}
  aria-label={musicOn ? "Pause musik" : "Putar musik"}
>
  {musicOn ? <Pause size={15} /> : <Music2 size={15} />}
  <span>{musicOn ? "pause" : "our song"}</span>
</button>
      </header>

      <main>
        {/* 01 — DATE / TIME */}
        <section className="hero section-pad" id="home">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              <span className="eyebrow-line" /> A LITTLE SOMETHING FOR YOU{" "}
              <span className="eyebrow-line" />
            </div>
            <p className="hero-kicker">dear, {story.recipient} ♡</p>
            <h1>
              Today is all
              <br />
              about <em>you.</em>
            </h1>
            <p className="hero-intro">{story.intro}</p>
            <div className="hero-meta">
              <div>
                <span className="meta-label">THE SPECIAL DAY</span>
                <strong>{story.birthdayDate}</strong>
              </div>
              <span className="meta-divider" />
              <div>
                <span className="meta-label">MADE WITH</span>
                <strong>a little too much love</strong>
              </div>
            </div>
            {days && (
              <div className="countdown">
                {days.passed ? (
                  <span>Hari istimewamu sudah tiba ♡</span>
                ) : (
                  <>
                    {[
                      ["hari", days.d],
                      ["jam", days.h],
                      ["menit", days.m],
                      ["detik", days.s],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <b>{String(val).padStart(2, "0")}</b>
                        <small>{label}</small>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            <button className="text-link" onClick={() => scrollTo("gift")}>
              mulai buka ceritanya <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-art reveal">
            <div className="sun-disc" />
            <div className="hero-photo-wrap">
              <img
                src={story.photos[0].src}
                alt="A memory to keep"
                className="hero-photo"
              />
            </div>
            <div className="photo-sticker">
              for you,
              <br />
              <em>always</em> <span>♡</span>
            </div>
            <div className="scribble-star">✳</div>
            <div className="tape tape-top" />
            <div className="date-stamp">
              A DAY
              <br />
              TO KEEP
              <br />
              <span>✦</span>
            </div>
            <p className="handwritten hero-hand">
              you make
              <br />
              ordinary days
              <br />
              feel golden
            </p>
          </div>
          <div className="hero-bottom-note">
            <span>VOL. 01</span>
            <span>AN ARCHIVE OF US</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        {/* 02 — GIFT */}
        <section className="gift-section section-pad" id="gift">
          <div className="section-heading reveal">
            <span className="section-no">01 / THE SURPRISE</span>
            <h2>
              A tiny box,
              <br />
              <em>a whole lot of love.</em>
            </h2>
            <p>
              Katanya hadiah terbaik nggak selalu harus dibungkus. Tapi yang ini
              tetap aku bungkus, biar ada bagian serunya.
            </p>
          </div>
          <div className={`gift-stage ${giftOpen ? "is-open" : ""}`}>
            <span className="gift-spark spark-a">✦</span>
            <span className="gift-spark spark-b">✧</span>
            <button
              className="gift-box"
              onClick={() => setGiftOpen(!giftOpen)}
              aria-label={giftOpen ? "Tutup kotak hadiah" : "Buka kotak hadiah"}
            >
              <span className="gift-lid">
                <span className="bow">♡</span>
              </span>
              <span className="gift-body">
                <span className="ribbon-v" />
                <span className="ribbon-h" />
              </span>
            </button>
            {giftOpen && (
              <div className="gift-note">
                <Sparkles size={18} />
                <p>
                  Plot twist: hadiah utamanya adalah kamu yang masih ada di
                  sini.
                </p>
                <button onClick={() => scrollTo("memories")}>
                  lanjut lihat kenangan <ArrowRight size={15} />
                </button>
              </div>
            )}
            {!giftOpen && (
              <p className="click-hint">
                ketuk kotaknya untuk membuka <span>↗</span>
              </p>
            )}
          </div>
        </section>

        {/* 03 — BRIDGE TO MEMORIES */}
        <section className="bridge-section section-pad" id="memories">
          <div className="bridge-top">
            <span className="section-no">02 / THE LITTLE THINGS</span>
            <span className="handwritten">somehow, it became us</span>
          </div>
          <div className="bridge-title">
            <h2>
              Kalau dipikir-pikir,
              <br />
              kita sudah punya <em>banyak cerita.</em>
            </h2>
            <p>
              Beberapa momen mungkin terlihat biasa buat orang lain. Tapi aku
              simpan baik-baik, karena ada kamu di dalamnya.
            </p>
          </div>
          <div className="memory-rail">
            {story.memories.map((m, i) => (
              <article className={`memory-card memory-${i + 1}`} key={m.date}>
                <div className="memory-top">
                  <span>0{i + 1}</span>
                  <span>✳</span>
                </div>
                <div className="memory-doodle">{["♡", "✳", "∞"][i]}</div>
                <span className="memory-date">{m.date}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <div className="bridge-footer">
            <span>NOT A PERFECT STORY.</span>
            <span className="handwritten">just our kind of beautiful.</span>
            <span>♡</span>
          </div>
        </section>

        {/* 04 — LETTER */}
        <section className="letter-section section-pad" id="letter">
          <div className="letter-side">
            <span className="section-no">03 / SOMETHING I MEAN</span>
            <h2>
              Words I don't
              <br />
              say <em>enough.</em>
            </h2>
            <p>Untuk dibaca pelan-pelan, kalau kamu punya waktu sebentar.</p>
            <span className="letter-side-doodle">↘</span>
          </div>
          <div className={`letter-card ${letterOpen ? "letter-open" : ""}`}>
            <div className="letter-topline">
              <span>PERSONAL NOTE</span>
              <span>NO. 001 — JUST FOR YOU</span>
            </div>
            <div className="letter-envelope">
              <div className="envelope-flap" />
            </div>
            <div className="letter-paper">
              <div className="letter-paper-head">
                <span>dear, {story.recipient}</span>
                <Heart size={17} />
              </div>
              <div className="letter-content">
                {story.letter.split("\n").map((line, i) => (
                  <p key={i}>{line || "\u00a0"}</p>
                ))}
              </div>
              <div className="letter-signoff">
                with all my heart,
                <br />
                <em>{story.sender}</em> ♡
              </div>
            </div>
            <button
              className="letter-button"
              onClick={() => setLetterOpen(!letterOpen)}
            >
              {letterOpen ? (
                <>
                  <Check size={15} /> surat sudah terbuka
                </>
              ) : (
                <>
                  <Mail size={15} /> buka suratnya
                </>
              )}
            </button>
            <span className="letter-stamp">
              SEALED
              <br />
              WITH LOVE
            </span>
          </div>
        </section>

        {/* 05 — GALLERY */}
        <section className="gallery-section section-pad" id="gallery">
          <div className="gallery-heading">
            <div>
              <span className="section-no">04 / THE PHOTO DUMP</span>
              <h2>
                Little moments,
                <br />
                <em>kept forever.</em>
              </h2>
            </div>
            <p>
              Sepuluh potongan waktu yang ingin aku simpan sedikit lebih lama.
              Klik foto untuk melihat lebih dekat.
            </p>
          </div>
          <div className="gallery-grid">
            {story.photos.slice(0, 15).map((photo, i) => (
              <button
                className={`gallery-item photo-${i + 1}`}
                key={photo.date}
                onClick={() => setActivePhoto(i)}
                aria-label={`Lihat foto ${i + 1}`}
              >
                <div className="gallery-image">
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <span className="zoom-icon">
                    <Camera size={16} />
                  </span>
                </div>
                <div className="gallery-caption">
                  <span>{photo.date}</span>
                  <p>{photo.caption}</p>
                </div>
                {i % 3 === 0 && <span className="gallery-heart">♡</span>}
              </button>
            ))}
          </div>
          <div className="gallery-bottom">
            <span>10 FRAMES / INFINITE FEELINGS</span>
            <span className="handwritten">to be continued...</span>
          </div>
        </section>

        {/* 06 — VIDEO */}
        <section className="film-section section-pad" id="film">
          <div className="film-header">
            <span className="section-no">05 / A MOVING MEMORY</span>
            <span className="handwritten">press play, stay awhile</span>
          </div>
          <div className="film-layout">
            <div className="film-copy">
              <h2>
                Some things
                <br />
                are better <em>in motion.</em>
              </h2>
              <p>
                Foto bisa menyimpan satu detik. Video bisa mengembalikan suara,
                tawa, dan semua hal kecil yang bikin momen itu terasa hidup.
              </p>
              <span className="film-counter">PLAYBACK / 00:01</span>
            </div>
            <div className="film-frame">
              {story.videoFile ? (
                <video controls playsInline poster={story.videoPoster}>
                  <source src={story.videoFile} type="video/mp4" />
                  Browser kamu tidak mendukung video.
                </video>
              ) : (
                <div
                  className="video-placeholder"
                  style={{
                    backgroundImage: `linear-gradient(0deg,rgba(37,32,26,.48),rgba(37,32,26,.04)),url(${story.videoPoster})`,
                  }}
                >
                  <div className="film-label">
                    OUR LITTLE MOVIE <span>♡</span>
                  </div>
                  <button
                    onClick={() =>
                      document
                        .getElementById("video-help")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="play-button"
                    aria-label="Cara menambahkan video"
                  >
                    <Play fill="currentColor" size={22} />
                  </button>
                  <p>the moments we want to replay</p>
                </div>
              )}
              <div className="film-perforation" />
            </div>
          </div>
        </section>

        {/* 07 — BIRTHDAY WISHES */}
        <section className="wishes-section section-pad" id="wishes">
          <div className="wishes-decoration">✳</div>
          <span className="section-no">06 / A FEW WISHES</span>
          <h2>
            For your next
            <br />
            <em>chapter.</em>
          </h2>
          <p className="wishes-intro">
            Kalau aku boleh minta beberapa hal untuk tahun barumu...
          </p>
          <div className="wish-card">
            <span className="wish-number">
              WISH 0{wishIndex + 1} / 0{story.wishes.length}
            </span>
            <div className="wish-quote">“</div>
            <p>{story.wishes[wishIndex]}</p>
            <div className="wish-controls">
              <button
                onClick={() => changeWish(-1)}
                aria-label="Ucapan sebelumnya"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="wish-dots">
                {story.wishes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWishIndex(i)}
                    className={i === wishIndex ? "active" : ""}
                    aria-label={`Ucapan ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => changeWish(1)}
                aria-label="Ucapan berikutnya"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="wish-footnote handwritten">
            make a wish, darling ✷
          </div>
        </section>

        {/* 08 — CLOSING */}
        <section className="closing-section section-pad" id="closing">
          <div className="closing-inner">
            <div className="closing-top">
              <span>ONE LAST THING...</span>
              <span>♡</span>
            </div>
            <div className="closing-sparkle">✳</div>
            <p className="closing-pre">
              to the person who makes my world softer,
            </p>
            <h2>
              Happy
              <br />
              <em>Birthday,</em>
              <br />
              <span>{story.recipient}.</span>
            </h2>
            <p className="closing-message">
              Semoga kamu selalu menemukan kebahagiaan, bahkan dalam hal-hal
              kecil. Terima kasih sudah lahir, sudah tumbuh sejauh ini, dan
              sudah menjadi kamu.
            </p>
            <div className="closing-signature">
              <span className="signature-line" />
              <span>made with love,</span>
              <strong>{story.sender}</strong>
              <span className="signature-heart">♡</span>
            </div>
            <button className="back-to-top" onClick={() => scrollTo("home")}>
              kembali ke awal ↑
            </button>
          </div>
          <div className="closing-footer">
            <span>THIS LITTLE WEBSITE IS YOURS.</span>
            <span>MADE WITH ♡, JUST FOR YOU.</span>
            <span>END OF VOL. 01</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>little archive © 2026</span>
        <span>somewhere between a memory and a love letter.</span>
        <span>♡</span>
      </footer>

      {activePhoto !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto kenangan"
          onClick={() => setActivePhoto(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setActivePhoto(null)}
            aria-label="Tutup"
          >
            <X />
          </button>
          <button
            className="lightbox-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto(
                (activePhoto - 1 + story.photos.length) % story.photos.length,
              );
            }}
            aria-label="Foto sebelumnya"
          >
            <ArrowLeft />
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={story.photos[activePhoto].src}
              alt={story.photos[activePhoto].caption}
            />
            <span>{story.photos[activePhoto].date}</span>
            <p>{story.photos[activePhoto].caption}</p>
          </div>
          <button
            className="lightbox-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              setActivePhoto((activePhoto + 1) % story.photos.length);
            }}
            aria-label="Foto berikutnya"
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
