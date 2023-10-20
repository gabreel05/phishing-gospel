import { ReactNode, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import GlobalStyle from './styles/global'

import loadEmails from './services/emails'

ReactModal.setAppElement('#root')

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  content: ReactNode
}

const data = loadEmails()

export default function App() {
  const [emails, _] = useState(data)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="App">
      <HeaderContainer>
        <h1>PHISHING</h1>
        <HeaderButton onClick={openModal}>Enviar</HeaderButton>
      </HeaderContainer>
      {emails.map((email, index) => (
        <CardContainer>
          <CardCheckbox checked={isChecked} onChange={handleCheckboxChange} />
          <CardContent>
            <CardTitle>{email.title}</CardTitle>
            <CardAuthor>From: {email.author}</CardAuthor>
            <CardBody>{email.body}</CardBody>
          </CardContent>
        </CardContainer>
      ))}
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={
          <div>
            Parabéns você descobriu todos os e-mails de Phishing! Aqui está sua
            Flag: Teste
          </div>
        }
      />
      <GlobalStyle />
    </div>
  )
}

function Modal({ isOpen, closeModal, content }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        },
        content: {
          border: 'none',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: 'auto',
        },
      }}
    >
      <ModalContainer>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
        {content}
      </ModalContainer>
    </ReactModal>
  )
}

const HeaderContainer = styled.div`
  height: 80px;
  padding: 0 30px;
  background: #6200ee;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderButton = styled.button`
  height: 40px;
  padding: 0 20px;
  margin-left: 10px;
  background: #fff;
  color: #6200ee;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }
`

const CardContainer = styled.div`
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
`

const CardCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`

const CardContent = styled.div`
  flex: 1;
`

const CardTitle = styled.h3`
  margin: 0;
`

const CardAuthor = styled.p`
  margin: 0;
  font-size: 0.8em;
`

const CardBody = styled.p`
  margin: 10px 0 0 0;
`

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`

const ModalCloseButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`
