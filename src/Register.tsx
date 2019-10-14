import React, { FormEvent, ReactNode } from 'react';

export class Register extends React.Component<{}, { name: string }> {

  constructor(props: {}) {
    super(props);

    this.state = {
      name: '',
    };
  }

  public handleSubmit = (event: FormEvent<HTMLFormElement>): void => {

    const firstName: HTMLInputElement = event.currentTarget.elements.namedItem('firstName') as HTMLInputElement;

    this.setState({
      name: firstName.value,
    });
    event.preventDefault();
  }

  public render(): ReactNode {

    const { name } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name:
          <input type="text" name="firstName" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Current name is: {name}</p>
      </div>
    );
  }
}
