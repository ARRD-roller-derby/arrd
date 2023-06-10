import { useState } from 'react'
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite'

interface PopinProps {
  children: React.ReactNode
  buttonTxt: string
  modalTitle?: string
  loading?: boolean
  buttonTxtConfirm?: string
  handleSubmit?: () => void
  noFooter?: boolean
}

export const Popin: React.FC<PopinProps> = ({
  children,
  modalTitle,
  buttonTxt,
  buttonTxtConfirm,
  loading,
  handleSubmit,
  noFooter,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOk = () => {
    handleSubmit && handleSubmit()
    //handleClose()
  }

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
        <Modal.Body>{children}</Modal.Body>
        {!noFooter && (
          <Modal.Footer>
            <Button onClick={handleOk} appearance="primary">
              {buttonTxtConfirm ? buttonTxtConfirm : 'OK'}
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Fermer
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}
