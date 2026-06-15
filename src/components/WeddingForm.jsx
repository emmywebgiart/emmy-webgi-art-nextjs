"use-client"

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const imgFloresTitle = "/img/invitaciones/anamercedesyjoseluis/flor_title.webp"

function WeddingForm() {
  const [fullName, setFullName] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [message, setMessage] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [confirmedName, setConfirmedName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({
    fullName: "",
    message: "",
    confirmation: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = fullName.trim()
    const trimmedMessage = message.trim()

    let newErrors = {
      fullName: "",
      message: "",
      confirmation: "",
    }
    let hasError = false

    if (!trimmedName) {
      newErrors.fullName = "Por favor ingresa tu nombre completo."
      hasError = true
    }

    if (!confirmation) {
      newErrors.confirmation = "Por favor selecciona tu confirmación."
      hasError = true
    }

    if (!trimmedMessage) {
      newErrors.message = "Por favor ingresa un mensaje para los novios."
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return;
    }

    setErrors({ fullName: "", message: "", confirmation: "" })
    setIsLoading(true)

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: trimmedName,
          confirmation,
          message: trimmedMessage,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setConfirmedName(trimmedName)
        setConfirmed(true)
        setFullName("")
        setConfirmation("")
        setMessage("")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => setConfirmed(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [confirmed])

  return (
    <>
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
        className="section_general_title_container"
      >
        <div className="position-relative">
            <h3 className="section_title_color_p3 text-center font_great_vibes mb-0 position-relative z-1" 
                style={{
                    background: "rgb(255 255 255 / 50%)",
                    padding: "1rem",
                    backdropFilter: "blur(5px)"
                }}
            >Confirma tu asistencia</h3>
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

      <form onSubmit={handleSubmit} className="card_general bg_p5 mt-5">
        <div className="card_body">
          <div className="d-flex flex-column gap_3">
            <div className="d-flex flex-column">
              <label htmlFor="name" className="mb_1 fs_6">
                Nombre completo o familia
              </label>
              <input
                id="name"
                className="form_input bg_white"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                placeholder="Ingresa tu nombre o apellido de familia"
              />
              {errors.fullName && (
                <small className="text-danger">{errors.fullName}</small>
              )}
            </div>

            <div className="confirmation_container d-flex flex-column">
              <p className="mb_1 fs_6">Confirmación</p>
              <div className="row">
                <div className="col-6">
                  <label
                    className={`confirm_card bg_white d-flex justify-content-center align-items-center flex-column gap_2 ${
                      confirmation === "Sí" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="confirmation"
                      value="Sí"
                      checked={confirmation === "Sí"}
                      onChange={(e) => setConfirmation(e.target.value)}
                    />
                    <span className="radio_circle position-relative"></span>
                    <p className="text-center fw-bold mb-0">Sí asistiré</p>
                  </label>
                </div>

                <div className="col-6">
                  <label
                    className={`confirm_card bg_white d-flex justify-content-center align-items-center flex-column gap_2 ${
                      confirmation === "No" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="confirmation"
                      value="No"
                      checked={confirmation === "No"}
                      onChange={(e) => setConfirmation(e.target.value)}
                    />
                    <span className="radio_circle position-relative"></span>
                    <p className="text-center fw-bold mb-0">No asistiré</p>
                  </label>
                </div>
              </div>
              {errors.confirmation && (
                <small className="text-danger">{errors.confirmation}</small>
              )}
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="message" className="mb_1 fs_6">
                Dedicatoria para los novios
              </label>
              <textarea
                id="message"
                className="form_input bg_white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje con cariño para los novios..."
              />
              {errors.message && (
                <small className="text-danger">{errors.message}</small>
              )}
            </div>

            <button
              type="submit"
              className={`button_general ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </form>

      {confirmed && (
        <div className="full_screen bg_p3 d-flex align-items-center justify-content-center">
          <div className="card_body">
            <p
              className="text-center font_great_vibes color_p4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              ¡Gracias por confirmar tu asistencia!
            </p>
            <p className="text-white text-center font_lustria fs_4"><strong>{confirmedName}</strong></p>
            <p className="text-white text-center font_lustria fs_6">
              Nos alegra mucho que nos acompañes en este día tan especial.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default WeddingForm;