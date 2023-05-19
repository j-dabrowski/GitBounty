import { Form, Skeleton, Card, Button } from 'web3uikit'
import { useState } from 'react'
import { Fragment } from 'react'
import useSWR from 'swr'
import BountyModal from '../../components/BountyModal'

export default function FormForData() {
  const [formData, setFormData] = useState({ owner: '', repo: '' })
  const [showForm, setShowForm] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // We create also a setShowModal again to false for the closing of the
  //Modal
  const hideModal = () => setShowModal(false)

  console.log(formData.owner)
  async function fetcher(url) {
    const res = await fetch(url)

    return res.json()
  }
  const { data } = useSWR(formData.owner ? `/api/issues?owner=${formData.owner}` : null, fetcher)
  /**
   * @notice Function executed when submit
   */
  const handleSubmit = (data) => {
    const owner = data.data[0].inputResult

    setFormData({ owner: owner })
    setShowForm(false)
  }
  /**
   * @notice Function executed when we click on the button for each card
   */
  const handleClick = () => {
    setShowModal(true)
  }

  async function CreateEscrowContract() {}

  return (
    <Fragment>
      <div>
        {showForm && (
          <div className="p-5">
            <Form
              onSubmit={handleSubmit}
              //Data object es especial de esta libreria y de este Form, y contiene una lista de
              //de los fields que va tenr nuestro form
              data={[
                {
                  name: 'Owner',
                  type: 'text',
                  inputWidth: '100%',
                  value: '',
                  key: 'owner',
                },
              ]}
              title="Search your Repos"
              id="MainForm"
            />
          </div>
        )}
      </div>
      <div className="text-white">
        {!showForm && (
          <div>
            {data ? (
              <div className="flex flex-col justify-evenly p-5">
                {data.filteredIssues.map((item) =>
                  item.issuesWithDetails.map((issue) => (
                    <div className="p-5">
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
          </div>
        )}
      </div>
    </Fragment>
  )
}
