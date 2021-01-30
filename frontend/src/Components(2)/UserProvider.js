import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    tab: "Home",
    username: null,
  }

  // Method to update state
  changeTab = tab => {
    this.setState(prevState => ({ tab }))
  }

  render() {
    const { children } = this.props
    const { tab } = this.state
    const { changeTab } = this

    return (
      <UserContext.Provider
        value={{
          tab,
          changeTab,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }