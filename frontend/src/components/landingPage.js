import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaList,
  FaAngleRight,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const LandingPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const whatsappMessage = `Nama: ${name}\nEmail: ${email}\nSubjek: ${subject}\nPesan: ${message}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=6289506637083&text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <FaList />
          <h2>Selesaaiin</h2>
        </div>
        <ul className="nav-links">
          <button onClick={() => scrollToSection("hero")}>Beranda</button>
          <button onClick={() => scrollToSection("about-us")}>Tentang</button>
          <button onClick={() => scrollToSection("features")}>Fitur</button>
          <button onClick={() => scrollToSection("contact-us")}>Kontak</button>
        </ul>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")} className="login-button">
            Masuk
          </button>
          <button
            onClick={() => navigate("/register")}
            className="signup-button"
          >
            Daftar
          </button>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>
            Selamat Datang di Selesaaiin: Solusi Efektif untuk Mengelola Tugas
            Anda!
          </h1>
          <p>
            Selesaaiin adalah aplikasi manajemen tugas yang intuitif dan canggih
            untuk mengatur, melacak, dan menyelesaikan tugas-tugas Anda dengan
            mudah. Dapatkan kontrol penuh atas proyek Anda, atur deadline, dan
            berkolaborasi dengan tim Anda tanpa stres. Temukan cara baru untuk
            meningkatkan produktivitas dan efisiensi dengan Selesaaiin!
          </p>
          <button onClick={() => navigate("/login")} className="try-button">
            Coba Sekarang <FaAngleRight />
          </button>
        </div>
        <div className="hero-image">
          <img src="/assets/images/beranda.jpg" alt="beranda" />
        </div>
      </section>

      <section id="about-us" className="about-us">
        <div className="about-us-image">
          <img src="/assets/images/tentang.jpg" alt="tentang" />
        </div>
        <div className="about-us-content">
          <h2>Tentang Kami</h2>
          <h3>Visi Kami</h3>
          <p>
            Sebagai tim di balik aplikasi "Selesaaiin", visi kami adalah
            memberikan solusi manajemen tugas yang intuitif, efisien, dan dapat
            diandalkan bagi individu dan tim. Kami percaya bahwa dengan alat
            yang tepat, setiap orang dapat mencapai lebih banyak dan
            meningkatkan produktivitas mereka dalam mengelola tugas-tugas
            sehari-hari.
          </p>
          <h3>Misi Kami</h3>
          <p>
            Misi kami adalah menyediakan platform yang mudah digunakan dan
            berdaya guna bagi pengguna dari berbagai latar belakang dan
            kebutuhan. Kami berkomitmen untuk terus meningkatkan dan
            menyempurnakan aplikasi kami, serta mendengarkan umpan balik dari
            pengguna kami untuk memastikan bahwa Selesaaiin tetap menjadi solusi
            yang sesuai dengan kebutuhan mereka.
          </p>
        </div>
      </section>

      <section id="features" className="features">
        <div className="features-content">
          <h2>Fitur Utama Selesaaiin</h2>
          <div className="feature">
            <h3>Membuat Daftar Tugas yang Jelas dan Terstruktur</h3>
            <ul>
              <li>
                Rencanakan tugas-tugas Anda dengan mudah dan organisasi yang
                jelas.
              </li>
              <li>
                Buat daftar tugas yang terstruktur sesuai dengan kebutuhan Anda.
              </li>
            </ul>
          </div>
          <div className="feature">
            <h3>Menetapkan Tenggat Waktu dan Prioritas</h3>
            <ul>
              <li>
                Tetapkan tenggat waktu dan prioritas untuk setiap tugas agar
                Anda dapat mengelola waktu Anda dengan efisien.
              </li>
              <li>
                Prioritaskan tugas-tugas Anda berdasarkan kepentingan dan
                deadline.
              </li>
            </ul>
          </div>
          <div className="feature">
            <h3>Melacak Kemajuan dan Menandai Tugas yang Selesai</h3>
            <ul>
              <li>Pantau kemajuan tugas-tugas Anda dengan mudah.</li>
              <li>
                Tandai tugas yang sudah selesai untuk melihat progres Anda
                secara langsung.
              </li>
            </ul>
          </div>
          <div className="feature">
            <h3>Peringatan dan Notifikasi</h3>
            <ul>
              <li>
                Terima peringatan dan notifikasi untuk tugas-tugas yang akan
                datang.
              </li>
              <li>
                Jangan pernah lewatkan tenggat waktu penting lagi dengan fitur
                peringatan yang dapat diandalkan.
              </li>
            </ul>
          </div>
        </div>
        <div className="feature-image">
          <img src="/assets/images/fitur.jpg" alt="fitur" />
        </div>
      </section>

      <section id="contact-us" className="contact-us">
        <div className="contact-us-image">
          <img src="/assets/images/kontak.jpg" alt="kontak" />
        </div>
        <div className="contact-us-content">
          <h2>Kontak Kami</h2>
          <h3>Hubungi Kami</h3>
          <h4>Ada pertanyaan atau masukan? kami siap membantu Anda!</h4>
          <ul>
            <li>Email: info@selesaiin.com</li>
            <li>Telepon: +62 123 4567 8901</li>
            <li>Alamat Kantor: Jalan Contoh No.123, Kota Contoh, Indonesia</li>
          </ul>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subjek"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Pesan anda"
              required
            ></textarea>
            <button type="submit">Kirim Pesan</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-text">
              <FaList /> <h2>Selesaaiin</h2>
            </div>
            <p>
              Solusi Manajemen Tugas Intuitif untuk Produktivitas yang Maksimal.
            </p>
          </div>
          <div className="footer-link">
            <h6>Informasi</h6>
            <a href="#about" onClick={() => scrollToSection("about-us")}>
              Tentang Kami
            </a>
            <a href="#features" onClick={() => scrollToSection("features")}>
              Fitur Kami
            </a>
            <a href="#contact" onClick={() => scrollToSection("contact-us")}>
              Kontak Kami
            </a>
          </div>
          <div className="footer-link">
            <h6>Tautan</h6>
            <a href="#home" onClick={() => scrollToSection("hero")}>
              Beranda
            </a>
            <a href="#about" onClick={() => scrollToSection("about-us")}>
              Tentang
            </a>
            <a href="#features" onClick={() => scrollToSection("features")}>
              Fitur
            </a>
            <a href="#contact" onClick={() => scrollToSection("contact-us")}>
              Kontak
            </a>
          </div>
          <div className="footer-link">
            <h6>Servis</h6>
            <a href="/login">Buat Daftar Tugas</a>
            <a href="#contact" onClick={() => scrollToSection("contact-us")}>
              Kontak Kami
            </a>
          </div>
          <div className="footer-link">
            <h6>Kontak</h6>
            <a>
              <FaEnvelope /> info@selesaiin.com
            </a>
            <a>
              <FaPhone /> +62 123 4567 8901
            </a>
            <a>
              <FaLocationDot /> Jalan Contoh No. 123, Kota Contoh, Indonesia
            </a>
          </div>
        </div>
        <p>© 2024 Selesaaiin. Seluruh hak cipta dilindungi.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
