import React from 'react'

export const GithubUserContext = React.createContext({
  userRepoIssues: ['A', 'B', 'C'],
  setUserRepoIssues: (value) => value,
})

const GithubUsersContextProvider = ({ children }) => {
  const [userRepoIssues, setUserRepoIssues] = React.useState([])
  const value = React.useMemo(() => ({ userRepoIssues, setUserRepoIssues }), [userRepoIssues])
  return (
    <GithubUserContext.Provider value={value}>
      {React.useMemo(
        () => (
          <>{children}</>
        ),
        []
      )}
    </GithubUserContext.Provider>
  )
}

export default GithubUsersContextProvider
