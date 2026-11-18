import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function ImagePreview({ src, alt, title, label, className, children }) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const backdropPointerDown = useRef(false)

  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger.focus({ preventScroll: true })
    }
  }, [open])

  function openPreview(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    backdropPointerDown.current = false
    setOpen(true)
  }

  return (
    <>
      <a ref={triggerRef} className={className} href={src} target="_blank" rel="noreferrer"
        aria-label={label} aria-haspopup="dialog" onClick={openPreview}>
        {children}
      </a>
      {open && (
        <dialog ref={dialogRef} className="image-dialog" aria-labelledby={titleId}
          onCancel={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
          onPointerDown={(event) => {
            backdropPointerDown.current = event.target === event.currentTarget
          }}
          onClick={(event) => {
            if (backdropPointerDown.current && event.target === event.currentTarget) setOpen(false)
            backdropPointerDown.current = false
          }}>
          <div className="modal-shell">
            <header className="modal-header">
              <h2 id={titleId}>{title}</h2>
              <button type="button" className="modal-close" aria-label="Close image preview" onClick={() => setOpen(false)}>
                <X size={22} aria-hidden="true" />
              </button>
            </header>
            <div className="modal-content image-preview-content">
              <img src={src} alt={alt} />
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
