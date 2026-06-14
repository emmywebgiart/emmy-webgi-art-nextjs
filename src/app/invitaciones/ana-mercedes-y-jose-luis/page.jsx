"use client"

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import { motion } from "motion/react";
import WeddingForm from "@/components/WeddingForm";

import 'swiper/css';
import 'swiper/css/autoplay';

const imgPrincipal = "/img/invitaciones/anamercedesyjoseluis/pareja1.jpeg"
const imgFlores = "/img/invitaciones/anamercedesyjoseluis/flores2.png"
const imgFloresTitle = "/img/invitaciones/anamercedesyjoseluis/flor_title.png"
const img2 = "/img/invitaciones/anamercedesyjoseluis/pareja2.jpeg"
const img3 = "/img/invitaciones/anamercedesyjoseluis/pareja3.jpeg"
const img4 = "/img/invitaciones/anamercedesyjoseluis/pareja4.jpeg"
const vestido2 = "/img/invitaciones/anamercedesyjoseluis/dresscode_vestido.png"
const traje = "/img/invitaciones/anamercedesyjoseluis/dresscode_traje.png"
const regalo = "/img/invitaciones/anamercedesyjoseluis/regalo.png"
const sello = "/img/invitaciones/anamercedesyjoseluis/sellolacre.png"
const imgRegalos = "/img/invitaciones/anamercedesyjoseluis/mesa_regalos.png"

const audio = "/audio/napoleoneres.mp3"


export default function IsaiLupita () {
    const targetDate = new Date("2026-08-08T00:00:00");

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const swiperRef = useRef(null);
    const audioRef = useRef(null)
    const [overlayVisible, setOverlayVisible] = useState(true)
    const containerRef = useRef(null)
    const innerBgRef = useRef(null)
    const [isContainerOpen, setContainerOpen] = useState(false)
    const [isInnerOpen, setInnerOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            return;
        }

        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        });
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        const audio = audioRef.current

        const handleVisibilityChange = () => {
            if (!audio) return

            if (document.hidden) {
                audio.pause()
                setIsPlaying(false)
            } else {
                audio.play().catch(() => {})
                setIsPlaying(true)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const abrirInvitacion = () => {
        setContainerOpen(true)

        setTimeout(() => setInnerOpen(true), 300)

        setTimeout(() => {
            setOverlayVisible(false)
            setIsPlaying(true)
            const audio = audioRef.current
            audio.muted = false
            audio.play().catch((err) => console.log("No se pudo reproducir audio:", err))
        }, 1300)
    };

    const { days, hours, minutes, seconds } = timeLeft;

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().catch(() => {})
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
        <main>
            {/* <audio ref={audioRef} src={audio} loop hidden /> */}

            {!overlayVisible && (
                <div className="full_screen bg_p3 grid_center">
                    <div
                        ref={containerRef}
                        className={`invitation_container d-flex justify-content-center align-items-center ${isContainerOpen ? 'open' : ''}`}
                    >
                        <div
                            ref={innerBgRef}
                            className={`inner_background ${isInnerOpen ? 'open' : ''}`}
                        ></div>
                        <div className="position-relative text-center z-2">
                            <h2 className="invitation_title font_great_vibes color_p4">Ana Mercedes y José Luis</h2>
                            <p className="text-white">Haz clic para abrir tu invitación</p>
                            <button className="button_invitation" onClick={abrirInvitacion}>
                                <img src={sello} alt="Sello Isai y Lupita" className="img_invitation_seal" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {overlayVisible && (
                <>
                    {/* <button className="sound_button z_4 grid-center" onClick={toggleAudio}>
                        <div className={`sound_equalizer ${isPlaying ? "playing" : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button> */}
                    <motion.section 
                        className="section_hero overflow-hidden d-flex flex-column justify-content-end" 
                        style={{backgroundImage: `url(${imgPrincipal})`, paddingBottom: "clamp(1rem, 3vw, 2rem)"}}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <div 
                        style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        right: "1rem",
                        bottom: "1rem",
                        border: "1px solid rgb(235, 229, 194)",
                        borderRadius: "2rem",
                        zIndex: 1,
                        }}
                        ></div>
                        <div className="hero_img_flowers_container position-absolute z-1">
                            <img src={imgFlores} alt="" className="w-100"/>
                        </div>                        
                        <motion.img
                            src={imgPrincipal}
                            className="hero_bg_img"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                        />
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2 }}
                            className="hero_content position-relative d-flex flex-column"
                            style={{gap: "1rem"}}
                        >
                            <motion.div 
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                                className="text-center position-relative z-2"             
                            >
                                <h2 className="hero_names font_lustria fs_4 text-uppercase fw-bolder mb-0" style={{background: "rgb(250 243 225 / 50%)", backdropFilter: "blur(10px)"}}>
                                    <span className="card_body">
                                        <span className="d-flex flex-column flex-lg-row gap-2 justify-content-center">  
                                            <span>Ana Mercedes</span>
                                            <span>y</span>
                                            <span>José Luis</span>
                                        </span>    
                                    </span>                                                                 
                                </h2>
                                {/* <motion.div
                                    className="hero_quote"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, delay: 1 }}
                                >
                                    <p className="hero_quote_text font_lustria text-white mb-0">
                                        "Lo que se cuida y se pone en manos de Dios, dura toda la vida"
                                    </p>
                                </motion.div> */}
                            </motion.div>
                            <motion.div 
                                className="hero_title_container text-center position-relative z-2"
                                style={{padding: 0}}
                                initial={{ y: 30, opacity: 0, scale: 0.98 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            >
                                <h1 className="hero_title font_lustria d-inline-block mb-0 text-uppercase fs_6">Nos casamos</h1>
                            </motion.div>
                        </motion.div>
                    </motion.section>
                    <section className="section">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.88, y: 12 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.5
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="section_general_title_container pb-0"
                        >
                            <div className="position-relative">
                                <h3 className="section_title_color_p3 text-center font_great_vibes mb-0" 
                                    style={{
                                        background: "rgb(235 229 194 / 50%)",
                                        padding: "1rem",
                                        backdropFilter: "blur(5px)"
                                    }}
                                >Save the date</h3>
                                <img src={imgFloresTitle}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "220px",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: "-1"
                                    }}
                                />
                            </div>                           
                        </motion.div>
                        <div className="mt-5">
                            <p className="text-center">Con mucha ilusión y felicidad, te invitamos a acompañarnos en nuestra ceremonia civil, donde uniremos nuestras vidas y celebraremos el comienzo de una nueva historia juntos.</p>
                        </div>
                        <div className="d-flex flex-column gap_2">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-uppercase">Agosto</p>
                                <div className="text-center">
                                    <p className="fs_4 text-uppercase">Sábado</p>
                                    <p className="date_day fw-bolder">8</p>
                                </div>
                                <p className="fs_4 mb-0">2026</p>
                            </div>
                            <div>
                                <div className="d-flex flex-column gap_2">
                                    <div className="counter_container">
                                        <div className="row text-center">
                                            <div className="col-3">
                                                <div style={{padding: "0.5rem 0"}}>                                               
                                                    <span className="counter_number fw-bolder">
                                                        {days}
                                                    </span>
                                                    <span className="counter_label d-block text-center">Días</span>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div style={{padding: "0.5rem 0"}}>
                                                    <span className="counter_number fw-bolder">
                                                        {hours}
                                                    </span>
                                                    <span className="counter_label d-block text-center">Horas</span>
                                                </div>         
                                            </div>
                                            <div className="col-3">
                                                <div style={{padding: "0.5rem 0"}}>
                                                    <span className="counter_number fw-bolder">
                                                        {minutes}
                                                    </span>
                                                    <span className="counter_label d-block text-center">Minutos</span>
                                                </div>                           
                                            </div>
                                            <div className="col-3">
                                                <div style={{padding: "0.5rem 0"}}>
                                                    <span className="counter_number fw-bolder">
                                                        {seconds}
                                                    </span>
                                                    <span className="counter_label d-block text-center">Segundos</span>
                                                </div>                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>                 
                            </div>
                        </div>
                    </section>
                    {/* <section className="section_photo">
                        <img src={img2} alt="Foto pareja" className="w-100" />
                    </section> */}
                    {mounted && (
                    <section className="section_album">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                swiper.autoplay.start();
                            }}
                            spaceBetween={0}
                            slidesPerView={1}
                            modules={[Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            onInit={(swiper) => swiper.autoplay.start()}
                            onSlideChange={() => console.log('slide change')}
                        >
                            <SwiperSlide lazy="true">
                                <img src={img2} alt="" className="w-100" loading="lazy" />
                            </SwiperSlide>
                            <SwiperSlide lazy="true">
                                <img src={img3} alt="" className="w-100" loading="lazy" />
                            </SwiperSlide>
                            <SwiperSlide lazy="true">
                                <img src={img4} alt="" className="w-100" loading="lazy" />
                            </SwiperSlide>
                        </Swiper>                        
                    </section>
                    )}
                    <section className="section position-relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.88, y: 12 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.5
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="section_general_title_container position-relative pb-0"
                        >
                            <div className="position-relative">
                                <h3 className="section_title_color_p3 text-center font_great_vibes mb-0 position-relative z-1" 
                                    style={{
                                        background: "rgb(235 229 194 / 50%)",
                                        padding: "1rem",
                                        backdropFilter: "blur(5px)"
                                    }}
                                >Ceremonia civil</h3>
                                <img src={imgFloresTitle}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "220px",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>
                        </motion.div>
                        <section className="position-relative text-center mt-5">
                            <article>
                                <p className="mb-0">Centro de Espectáculos</p>
                                <p className="fw-bolder fs_4" translate="no">"Luxon"</p>
                            </article>
                            <article>
                                <p className="mb-0">Atlacomulco de Fabela, Estado de México</p>
                                <p className="fw-bolder fs_4">16:00 HRS</p>
                            </article>
                        </section>
                        <div className="position-relative d-flex justify-content-center">
                            <a href="https://www.google.com/maps/place/Centro+de+Espect%C3%A1culos+Luxon/@19.793568,-99.8659869,17z/data=!3m1!4b1!4m6!3m5!1s0x85d258dd0cf7184f:0xce7509adaac0b156!8m2!3d19.793568!4d-99.8659869!16s%2Fg%2F11b6jk03dx?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="button_general">Ver ubicación en Google Maps</a>
                        </div>
                    </section>                   
                    <section className="section" style={{background: "#F2E2B1"}}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.88, y: 12 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.5
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="section_general_title_container pb-0"
                        >
                            <div className="position-relative">
                                <h3 className="section_title_color_p3 text-center font_great_vibes mb-0 position-relative z-1" 
                                    style={{
                                        background: "rgb(255 255 255 / 50%)",
                                        padding: "1rem",
                                        backdropFilter: "blur(5px)"
                                    }}
                                >Código de vestimenta</h3>
                                <img src={imgFloresTitle}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "220px",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>
                        </motion.div>
                        <div className="mt-5">
                            <p className="text-center">Formal y elegante</p>
                        </div>
                        <div className="d-flex flex-column gap_3">
                            <section className="d-flex flex-column gap_4">
                                <article>
                                    <div className="d-flex justify-content-center align-items-center" style={{border: "2px solid var(--colorpalette4)", borderRadius: "12px"}}>
                                        <img src={vestido2} alt="" className="dress_code_img"/>
                                    </div>
                                </article>
                                <article>
                                    <div className="d-flex justify-content-center align-items-center" style={{border: "2px solid var(--colorpalette4)", borderRadius: "12px"}}>
                                        <img src={traje} alt="" className="dress_code_img" />
                                    </div>
                                </article>
                            </section>
                            <div className="text-center">
                                <p className="mb-0">Agradecemos tu presencia y te invitamos a acompañarnos con atuendo formal para celebrar este día tan especial.</p>
                            </div> 
                        </div>                       
                    </section>
                    <section className="section">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.88, y: 12 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.5
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="section_general_title_container pb-0"
                        >
                            <div className="position-relative">
                                <h3 className="section_title_color_p3 text-center font_great_vibes mb-0 position-relative z-1" 
                                    style={{
                                        background: "rgb(235 229 194 / 50%)",
                                        padding: "1rem",
                                        backdropFilter: "blur(5px)"
                                    }}
                                >Regalos</h3>
                                <img src={imgFloresTitle}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "220px",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>
                        </motion.div>
                        <div className="d-flex flex-column gap_3 mt-5">
                            <section className="d-flex flex-column gap_4">
                                <article>
                                    <div className="d-flex justify-content-center align-items-center" style={{border: "2px solid var(--colorpalette4)", borderRadius: "12px"}}>
                                        <img src={imgRegalos} alt="" className="dress_code_img"/>
                                    </div>
                                </article>
                            </section>
                            <div className="text-center">
                                <p className="mb-0">Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros,
            hemos preparado una mesa de regalos para tu comodidad.</p>
                            </div> 
                        </div>                       
                    </section>
                    <section className="section" style={{background: "#F2E2B1"}}>
                        <WeddingForm />
                    </section>
                </>
            )}
        </main>          
        </>
    )
}