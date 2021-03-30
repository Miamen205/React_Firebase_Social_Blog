import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./auth-context"
import { Link, useHistory } from "react-router-dom"
import SignInBtn from "./signInWithGoogle";


const labelStyles = {
    display: "block",
    marginBottom: 4
  };
  
  const inputStyles = {
    width: "100%",
    height: "2rem",
    lineHeight: "2rem",
    verticalAlign: "middle",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    padding: "0 0.25rem"
  };

  export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Failed to log in")
      }
  
      setLoading(false)
    }

return(
  <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
        Or <SignInBtn>Sign In With Google</SignInBtn>
      </div>
    </>
  );
};
