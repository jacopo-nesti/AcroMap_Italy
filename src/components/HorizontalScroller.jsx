import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

function HorizontalScroller({ title, icon, variant, resetKey, children, emptyText }) {
  const scrollerRef = useRef(null)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const items = Children.toArray(children)

  const updateScrollAvailability = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      setCanScrollPrevious(false)
      setCanScrollNext(false)
      return
    }

    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth)
    setCanScrollPrevious(scroller.scrollLeft > 2)
    setCanScrollNext(scroller.scrollLeft < maxScrollLeft - 2)
  }, [])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.scrollLeft = 0
    updateScrollAvailability()
  }, [resetKey, updateScrollAvailability])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateScrollAvailability()
    scroller.addEventListener("scroll", updateScrollAvailability, { passive: true })

    const resizeObserver = new ResizeObserver(updateScrollAvailability)
    resizeObserver.observe(scroller)

    return () => {
      scroller.removeEventListener("scroll", updateScrollAvailability)
      resizeObserver.disconnect()
    }
  }, [items.length, resetKey, updateScrollAvailability])

  const scroll = (direction) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.scrollBy({ left: direction * Math.max(280, scroller.clientWidth * 0.75) })
  }

  return (
    <section className={`city-activity city-activity--${variant}`} aria-labelledby={`${variant}-section-title`}>
      <div className="city-activity__header">
        <h4 id={`${variant}-section-title`} className="city-activity__title">
          <i className={`bi bi-${icon}`} aria-hidden="true"></i>
          {title}
          <span className="city-activity__count">{items.length}</span>
        </h4>

        {items.length > 1 && (
          <div className="city-activity__controls" aria-label={`Naviga ${title.toLowerCase()}`}>
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canScrollPrevious}
              aria-label={`Mostra ${title.toLowerCase()} precedenti`}
            >
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canScrollNext}
              aria-label={`Mostra ${title.toLowerCase()} successive`}
            >
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>

      {items.length > 0 ? (
        <div ref={scrollerRef} className="city-activity__scroller" role="list" tabIndex="0" aria-label={title}>
          {items.map((item, index) => (
            <div key={item.key || index} className="city-activity__item" role="listitem">
              {item}
            </div>
          ))}
        </div>
      ) : (
        <p className="city-activity__empty">{emptyText}</p>
      )}
    </section>
  )
}

export default HorizontalScroller
