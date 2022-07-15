import { useState, useEffect } from "react"

const useResponsive = () => {
  const MOBILE_BREAKPOINT = 480

  const [innerWidth, setInnerWidth] = useState(typeof window === "undefined" ? 0 : window.innerWidth)

  const handleWindowResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return {
    isMobile: innerWidth <= MOBILE_BREAKPOINT,
  }
}

export default useResponsive
