import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import { fetchUsers } from "./api";
import Toaster from "./Toaster/Toaster";
import { validateSchema } from "./validation";

class App extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.getUsers = this.getUsers.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.state = {
      message: "",
      var1: "",
      var2: "",
      user1: "",
      user2: "",
      loading: false,
    };
  }

  closeMessage() {
    this.setState((prev) => ({ ...prev, message: "" }));
  }

  async getUsers() {
    try {
      const [first, second] = await fetchUsers(
        this.state.var1,
        this.state.var2
      );
      this.setState((prev) => ({
        ...prev,
        user1: first.data.first_name,
        user2: second.data.first_name,
      }));
    } catch (error) {
      this.setState((prev) => ({ ...prev, message: error }));
    }
  }

  /**
   * @param {EventTarget} evt
   */
  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * @param {EventTarget} evt
   */
  handleSubmit(evt) {
    evt.preventDefault();
    const validErr = this.isValidForm();
    if (validErr.err) {
      this.setState((prev) => ({ ...prev, message: validErr.err }));
      return;
    }
    this.setState((prev) => ({ ...prev, loading: true }));
    try {
      this.getUsers();
    } catch (error) {
      this.setState((prev) => ({ ...prev, message: error.message }));
    } finally {
      this.setState((prev) => ({ ...prev, loading: false }));
    }
  }

  /**
   * Check is form valid
   * @return {{err: string}}
   */
  isValidForm() {
    const validMessage = validateSchema({
      var1: this.state.var1,
      var2: this.state.var2,
    });
    return validMessage;
  }

  render() {
    return (
      <div className="App">
        <Toaster
          onClose={this.closeMessage}
          show={this.state.message}
          text={this.state.message}
          variant="danger"
        />
        <header className="Simple page">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicUser1">
              <Form.Label>User # 1</Form.Label>
              <Form.Control
                type="number"
                placeholder="x"
                name="var1"
                value={this.state.var1}
                onChange={(evt) => this.handleChange(evt)}
                min="1"
                max="10"
              />
            </Form.Group>

            <Form.Group controlId="formBasicUser2">
              <Form.Label>User # 2</Form.Label>
              <Form.Control
                type="number"
                placeholder="y"
                name="var2"
                value={this.state.var2}
                onChange={(evt) => this.handleChange(evt)}
                min="1"
                max="10"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button type="submit">Get Users info</Button>
          </Form>

          <Form>
            {this.state.loading ? (
              <Spinner
                animation="border"
                style={{ marginTop: 5 }}
                variant="primary"
              />
            ) : (
              <Form.Group controlId="formAnswer">
                <Form.Text ref="answer">{`${this.state.user1} ${this.state.user2}`}</Form.Text>
              </Form.Group>
            )}
          </Form>
        </header>
      </div>
    );
  }
}
export default App;
