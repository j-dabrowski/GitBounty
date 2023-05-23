import { Form, Skeleton, Card } from 'web3uikit'
import { useState, useContext } from 'react'
import { Fragment } from 'react'
import useSWR from 'swr'
import BountyModal from '../../components/bounty-modal'
import requestReposIssues from '../api/issues'
import GithubUsersContextProvider, { GithubUserContext } from '../../context/Provider'

export default function FormForData() {
  const [formData, setFormData] = useState({ owner: '', repo: '' })
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { userRepoIssues } = useContext(GithubUserContext)

  const hideModal = () => setShowModal(false)

  console.log('hooooooooola ------- userRepoIssues', userRepoIssues)
  async function fetcher(url) {
    const res = await fetch(url)

    return res.json()
  }

  // console.log('requestReposIssues(', requestReposIssues())
  const { data } = useSWR(`/api/issues?owner=Chusynuk`, fetcher)
  // const { data } = useSWR(formData.owner ? `/api/issues?owner=${formData.owner}` : null, fetcher)

  const handleSubmit = (data) => {
    // event.preventDefault()
    const owner = data.data[0].inputResult

    setFormData((prev) => ({ ...prev, owner }))
    setShowForm(false)
  }

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <Fragment>
      {data ? (
        <div className="flex flex-col justify-evenly p-5">
          {data.filteredIssues.map((item) =>
            item.issuesWithDetails.map((issue, index) => (
              <div className="p-5" key={index}>
                <BountyModal esVisible={showModal} onClose={hideModal}></BountyModal>
                <Card
                  key={issue.issueId}
                  title={`Title: ${issue.title}`}
                  description={issue.issueUrl}
                >
                  <div className="flex fle-row justify-between">
                    <div className="italic text-sm mb-4 text-center">
                      Issues created by {issue.name}
                    </div>
                    <div className=" text-xl font-bold text-center">
                      AuthorID: #{issue.authorID}
                    </div>
                    <div className="italic text-lm mb-4 text-center">
                      <button
                        onClick={handleClick}
                        class="bg-lila hover:bg-lilaSuave text-white z-10 font-bold py-2 px-4 border-b-4 border-lilaSuave hover:border-lila rounded"
                      >
                        Create Bounty
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center p-2 border border-gray-500 rounded-xl w-100 gap-2">
          <Skeleton theme="image" />
          <div style={{ width: '100%', height: '100%' }}>
            <Skeleton theme="text" />
            <Skeleton theme="subtitle" width="30%" />
          </div>
          <Skeleton theme="image" />
          <div style={{ width: '100%', height: '100%' }}>
            <Skeleton theme="text" />
            <Skeleton theme="subtitle" width="30%" />
          </div>
        </div>
      )}
    </Fragment>
  )
}
