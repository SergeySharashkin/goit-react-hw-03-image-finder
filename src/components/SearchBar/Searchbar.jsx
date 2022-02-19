import { Component } from "react";
import { toast } from "react-toastify";

import { Header, Form, Button, Label, Input } from "./Searchbar.styled";
export default class Searchbar extends Component {
  state = {
    value: "",
  };
  handlerValueChange = (e) => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value.trim() === "") {
      toast("Введите в поисковую строку запрос", { position: "bottom-right" });
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handlerValueChange}
          />
        </Form>
      </Header>
    );
  }
}
