import { eventTypes } from 'database'
import { useState } from 'react'
import {
  DatePicker,
  Popin,
  Schema,
  Form,
  InputPicker,
  ButtonToolbar,
  Button,
  Modal,
  Checkbox,
  CheckboxGroup,
  Editor,
  DateRangePicker,
} from 'ui'
import { tiptapJsonToMd } from 'utils'
import styles from './event-create-form.module.css'

const { StringType } = Schema.Types
const model = Schema.Model({
  type: StringType().isOneOf(eventTypes),
})

export const EventCreateForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const [formError, setFormError] = useState<any>({
    status: undefined,
  })
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [formValue, setFormValue] = useState({
    type: 'entraînement',
    start: new Date(),
    end: new Date(),
    recurrence: false,
    description: '',
  })

  console.log('___', formValue)

  const handleSubmit = async () => {
    console.log(formValue)

    handleClose()
  }

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} loading={loading}>
          Ajouter un événement
        </Button>
      </ButtonToolbar>

      <Modal
        open={open}
        onClose={handleClose}
        overflow={true}
        className={styles.modal}
      >
        <Modal.Header>
          <Modal.Title>Créer un événement</Modal.Title>
        </Modal.Header>

        <Form
          formValue={formValue}
          onChange={(value: any) => setFormValue(value)}
          onCheck={setFormError}
          model={model}
          onSubmit={handleSubmit}
        >
          <Modal.Body>
            <Form.Group controlId="type">
              <Form.ControlLabel>Type</Form.ControlLabel>
              <Form.Control
                name="type"
                accepter={InputPicker}
                data={eventTypes.map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
            </Form.Group>

            <div className={styles.inline}>
              <Form.Group controlId="date">
                <Form.ControlLabel>Début</Form.ControlLabel>
                <Form.Control
                  name="start"
                  accepter={DatePicker}
                  format="dd-MM-yyyy HH:mm"
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.ControlLabel>Début</Form.ControlLabel>
                <Form.Control
                  name="duration"
                  accepter={DatePicker}
                  format="HH:mm"
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.ControlLabel>Fin</Form.ControlLabel>
                <Form.Control
                  name="end"
                  accepter={DateRangePicker}
                  format="HH:mm"
                />
              </Form.Group>
            </div>

            <Form.Group controlId="recurrence">
              <Checkbox
                name=" recurrence"
                checked={formValue.recurrence}
                onChange={(_value, checked) => {
                  setFormValue({ ...formValue, recurrence: checked })
                }}
              >
                Activer la récurrence
              </Checkbox>

              {/** Si récurence, demander combien et la fourchette */}
            </Form.Group>
            <Form.Group controlId="recurrence">
              <Editor
                // isEditable={false}
                content={{
                  type: 'doc',
                  content: [],
                }}
                setContent={(val: any) => {
                  setFormValue({ ...formValue, description: val })
                }}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.ControlLabel>Adresse</Form.ControlLabel>
              <Form.Control
                name="address"
                accepter={InputPicker}
                data={[
                  { label: 'League', value: 'league' },
                  { label: 'Public', value: 'public' },
                ]}
              />
            </Form.Group>

            <Form.Group controlId="visibility">
              <Form.ControlLabel>Visibilité</Form.ControlLabel>
              <Form.Control
                name="visibility"
                accepter={InputPicker}
                defaultValue="league"
                data={[
                  { label: 'League', value: 'league' },
                  { label: 'Public', value: 'public' },
                ]}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button appearance="primary" type="submit">
              créer
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Fermer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
