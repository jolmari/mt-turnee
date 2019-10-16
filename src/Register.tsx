import React, { FormEvent, ReactNode } from 'react'

export class Register extends React.Component<{}, { [key: string]: string }> {
    constructor(props: {}) {
        super(props)

        this.state = {
            firstName: '',
        }
    }

    public handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        const firstName: HTMLInputElement = event.currentTarget.elements.namedItem(
            'firstName'
        ) as HTMLInputElement

        this.setState({
            firstName: firstName.value,
        })
        event.preventDefault()
    }

    public handleInput = (
        name: string,
        event: FormEvent<HTMLInputElement>
    ): void => {
        const { value } = event.currentTarget

        this.setState({
            [name]: value,
        })
    }

    public render(): ReactNode {
        const { firstName, lastName, email } = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First name:
                        <input
                            type="text"
                            name="firstName"
                            onChange={event =>
                                this.handleInput('firstName', event)
                            }
                        />
                    </label>
                    <label>
                        Last name:
                        <input
                            type="text"
                            name="lastName"
                            onChange={event =>
                                this.handleInput('lastName', event)
                            }
                        />
                    </label>
                    <label>
                        E-mail address:
                        <input
                            type="text"
                            name="email"
                            onChange={event => this.handleInput('email', event)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <p id="output">
                    {firstName} {lastName} - {email}
                </p>
            </div>
        )
    }
}
