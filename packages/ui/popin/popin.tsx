import { useState } from 'react'
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite'

interface PopinProps {
  children: React.ReactNode
  buttonTxt: string
  modalTitle?: string
  loading?: boolean
}

export const Popin: React.FC<PopinProps> = ({
  children,
  modalTitle,
  buttonTxt,
  loading,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} loading={loading}>
          {buttonTxt}
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose} overflow={true}>
        {modalTitle && (
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <Placeholder.Paragraph />
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
