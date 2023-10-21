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

interface WelcomeModalProps {
  isOpen: boolean
  closeModal: () => void
}

const data = loadEmails()

export default function App() {
  const [emails] = useState(data)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [badModalIsOpen, setBadModalIsOpen] = useState(false)
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(true)
  const [isChecked, setIsChecked] = useState<Email[]>([])

  const handleCheckboxChange = (email: Email) => {
    if (isChecked.includes(email)) {
      setIsChecked(value => value.filter(item => item !== email))
      return
    }
    setIsChecked(value => [...value, email])
  }

  const openModal = () => {
    const isPhishing = data.filter(email => email.isPhishing)
    const everyIsPhishing =
      isPhishing.length === isChecked.length &&
      isChecked.every(email => email.isPhishing)
    everyIsPhishing ? setModalIsOpen(true) : setBadModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const closeBadModal = () => {
    setBadModalIsOpen(false)
  }

  const closeWelcomeModal = () => {
    setWelcomeModalIsOpen(false)
  }

  return (
    <div className="App">
      <HeaderContainer>
        <h1>CAIXA DE ENTRADA</h1>
        <HeaderButton onClick={openModal}>Enviar</HeaderButton>
      </HeaderContainer>
      {emails.map((email, index) => (
        <Card
          key={email.id}
          email={email}
          isChecked={isChecked.includes(email)}
          handleCheckboxChange={() => handleCheckboxChange(email)}
        />
      ))}
      6
      <WelcomeModal
        isOpen={welcomeModalIsOpen}
        closeModal={closeWelcomeModal}
      />
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={
          <div>
            <h2 style={{ marginTop: '60px' }}>
              Sua próxima pista está no local de comunhão familiar onde se
              constroem memórias e vazios são preenchidos. Sua próxima pista
              está sob a base de 4 pilares.
            </h2>
          </div>
        }
      />
      <BadModal
        isOpen={badModalIsOpen}
        closeModal={closeBadModal}
        content={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>
              Errou!
            </h1>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
              Tente Novamente!
            </h2>
            <img src="faustão.jpg" alt="Fausto Silva" width={180} />
            <audio controls={false} autoPlay>
              <source src="faustao-errou.mp3" type="audio/mp3"></source>
            </audio>
          </div>
        }
      />
      <GlobalStyle />
    </div>
  )
}

interface Email {
  id: number
  title: string
  author: string
  body: string
  isPhishing: boolean
}

interface CardProps {
  isChecked: boolean
  handleCheckboxChange: () => void
  email: Email
}

function Card({ isChecked, handleCheckboxChange, email }: CardProps) {
  return (
    <CardContainer>
      <CardCheckbox checked={isChecked} onChange={handleCheckboxChange} />
      <CardContent>
        <CardTitle>{email.title}</CardTitle>
        <CardAuthor>From: {email.author}</CardAuthor>
        <CardBody>{email.body}</CardBody>
      </CardContent>
    </CardContainer>
  )
}

function WelcomeModal({ isOpen, closeModal }: WelcomeModalProps) {
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
          maxHeight: '60vh',
        },
      }}
    >
      <ModalContainer>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
        <h3 style={{ marginTop: '5px' }}>
          Bem vindo(a) ao <strong>Phishing Gospel</strong>!
        </h3>
        <p>
          Você receberá uma série de e-mails, sua missão é descobrir quais são
          os e-mails de Phishing.
        </p>{' '}
        <br />
        <p>
          <strong>Phishing</strong> é um tipo de ataque de engenharia social
          comumente utilizado para roubar dados pessoais, como senhas e
          informações bancárias.
        </p>{' '}
        <br />
        <p>
          <strong>Engenharia social</strong> é uma técnica de manipulação
          psicológica que explora a ingenuidade das pessoas para obter
          informações confidenciais.
        </p>{' '}
        <br />
        <p>
          Mas nossos e-mails são um pouco diferentes... Cuidado com aqueles que
          querem roubar não simplesmente seus dados, mas sua eternidade!
        </p>{' '}
        <br />
        <p>
          Lembre-se de selecionar apenas os e-mails de <strong>phishing</strong>{' '}
          e clicar em
          <strong> Enviar</strong>.
        </p>
      </ModalContainer>
    </ReactModal>
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
          maxHeight: '60vh',
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

function BadModal({ isOpen, closeModal, content }: ModalProps) {
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
          maxHeight: '60vh',
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
  text-align: justify;
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
