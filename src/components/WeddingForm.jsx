"use-client"

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

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
        <h3 className="section_title_color_p3 text-center font_great_vibes mb-0"
          style={{
            background: "var(--colorpalette5)",
            padding: "1rem"
          }}
        >
          Confirma tu asistencia
        </h3>
      </motion.div>

      <form onSubmit={handleSubmit} className="card_border border_p3 mt-3">
        <div className="card_body">
          <div className="d-flex flex-column gap_3">
            <div className="d-flex flex-column">
              <label htmlFor="name" className="mb_1 fs_6">
                Nombre completo
              </label>
              <input
                id="name"
                className="form_input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                placeholder="Ingresa tu nombre completo"
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
                    className={`confirm_card d-flex justify-content-center align-items-center flex-column gap_2 ${
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
                    className={`confirm_card d-flex justify-content-center align-items-center flex-column gap_2 ${
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
                Mensaje para los novios
              </label>
              <textarea
                id="message"
                className="form_input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ingresa un mensaje para los novios"
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