const { useRef, useState, useEffect } = React

export function ColorButtons({ changeBackgroundColor }) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [palettePosition, setPalettePosition] = useState({ top: 0, left: 0 })
  const paletteRef = useRef(null)

  const colors = [
    '#faafa8', '#f39f76', '#fff8b8',
    '#e2f6d3', '#b4ddd3', '#aeccdc',
    '#f6e2dd', '#e9e3d4', '#efeff1'
  ]

  const handleButtonClick = (color) => {
    changeBackgroundColor(color)
    setIsPaletteOpen(false)
  }

  const handlePaletteToggle = (event) => {
    const { top, left } = event.currentTarget.getBoundingClientRect()
    setPalettePosition({ top: event.clientY - top, left: event.clientX - left })
    setIsPaletteOpen((prev) => !prev)
  }

  const handleClickOutsidePalette = (event) => {
    if (!isPaletteOpen && !paletteRef.current.contains(event.target)) {
      setIsPaletteOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsidePalette)

    return () => {
      document.removeEventListener('click', handleClickOutsidePalette)
    }
  }, [isPaletteOpen])

  return (
    <section className="color-buttons">
      <button
      title="Color Palette"
        type="button"
        className="btn open-palette"
        onClick={handlePaletteToggle}
      >
        <i className="ri-palette-line"></i>
      </button>
      <div
        className={`color-palette ${isPaletteOpen ? 'open' : 'closed'}`}
        ref={paletteRef}
        style={{ top: palettePosition.top, left: palettePosition.left }}
      >
        {colors.map((color, index) => (
          <button
            key={index}
            type="button"
            style={{ backgroundColor: color }}
            onClick={() => handleButtonClick(color)}
          ></button>
        ))}
      </div>
    </section>
  )
}
